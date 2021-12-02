const express = require('express');
const { newMessage, getAllMessage } = require('../controllers/message');
const router = express.Router();

router.put('/new-message', newMessage);
router.get('/', getAllMessage);

module.exports = router;
