const express = require('express');
const router = express.Router();
const callController = require('../controllers/callController');

router.post('/call-log', callController.logCall);

module.exports = router;