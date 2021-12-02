const express = require('express');
const { loginNewUser } = require('../controllers/login');
const router = express.Router();

router.put('/new-user', loginNewUser);

module.exports = router;
