module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("call-user", ({ targetId, offer }) => {
      io.to(targetId).emit("call-made", { offer, callerId: socket.id });
    });

    socket.on("make-answer", ({ targetId, answer }) => {
      io.to(targetId).emit("answer-made", { answer, responderId: socket.id });
    });

    socket.on("ice-candidate", ({ targetId, candidate }) => {
      io.to(targetId).emit("ice-candidate", { candidate });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
