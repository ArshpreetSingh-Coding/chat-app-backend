const pool = require("../db/db");

async function logCall(type, fromUser, toUser, timestamp) {
  await pool.query(
    "INSERT INTO call_logs (type, from_user, to_user, timestamp) VALUES ($1, $2, $3, $4)",
    [type, fromUser, toUser, timestamp]
  );
}

module.exports = {
  logCall,
};
