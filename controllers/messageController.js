const Message = require('../models/message.model');

async function storeMessage(req, res) {
  const { senderId, receiverId, message } = req.body;
  const timestamp = new Date();

  try {
    await Message.saveMessage(senderId, receiverId, message, timestamp);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("error in controller: ",err);
    
    res.status(500).json({ error: 'Failed to save message' });
  }
}

module.exports = {
  storeMessage,
};
