// console.log("✅ messageRoutes.js loaded");
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/message', messageController.storeMessage);
// console.log("✅ Exporting router:", typeof router);
module.exports = router;