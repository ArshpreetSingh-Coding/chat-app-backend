const Call = require("../models/call.model");

async function logCall(req, res) {
  const { type, from, to, timestamp } = req.body;

  try {
    await Call.logCall(type, from, to, timestamp);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Call log error:", err);
    res.status(500).json({ error: "Failed to log call" });
  }
}

module.exports = {
  logCall,
};
