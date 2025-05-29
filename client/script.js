const socket = io(); // connects to server

let localStream;
let peerConnection;
const config = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");
const ownIdInput = document.getElementById("ownId");
const targetIdInput = document.getElementById("targetId");
const callBtn = document.getElementById("callBtn");

// Get media stream
navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then((stream) => {
    localStream = stream;
    localVideo.srcObject = stream;
  });

// Get and show own socket ID
socket.on("connect", () => {
  ownIdInput.value = socket.id;
});

// Start a call
callBtn.onclick = async () => {
  peerConnection = createPeerConnection();

  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  socket.emit("call-user", {
    targetId: targetIdInput.value,
    offer,
  });

  logCall("initiated", socket.id, targetIdInput.value);
};

// Receive a call
socket.on("call-made", async ({ offer, callerId }) => {
  peerConnection = createPeerConnection();

  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);

  socket.emit("make-answer", { targetId: callerId, answer });

  logCall("received", callerId, socket.id);
});

// Receive an answer
socket.on("answer-made", async ({ answer }) => {
  await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
});

// ICE candidate exchange
socket.on("ice-candidate", ({ candidate }) => {
  peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
});

// Send own ICE candidates
function createPeerConnection() {
  const pc = new RTCPeerConnection(config);
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("ice-candidate", {
        targetId: targetIdInput.value,
        candidate: event.candidate,
      });
    }
  };
  pc.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
  };
  return pc;
}

// Call logging
function logCall(type, from, to) {
  fetch("/api/call-log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type,
      from,
      to,
      timestamp: new Date().toISOString(),
    }),
  });
}
