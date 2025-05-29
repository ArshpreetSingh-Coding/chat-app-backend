const Message = require("../models/message.model");
function chatSocket(io) {
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join", (userId) => {
      socket.join(userId);
    });

    socket.on("private-message", async ({ senderId, receiverId, message }) => {
      const timestamp = new Date();

      try {
        await Message.saveMessage(senderId, receiverId, message, timestamp);
      } catch (err) {
        console.error("DB error", err);
      }

      io.to(receiverId).emit("private-message", {
        senderId,
        message,
        timestamp,
      });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}
module.exports = chatSocket;
