const pool = require('../db/db');

async function saveMessage(senderId, receiverId, message, timestamp) {
  await pool.query(
    'INSERT INTO messages (sender_id, receiver_id, message, timestamp) VALUES ($1, $2, $3, $4)',
    [senderId, receiverId, message, timestamp]
  );
}

module.exports = {
  saveMessage,
};
