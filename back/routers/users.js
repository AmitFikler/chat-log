const express = require('express');
const { loginNewUser, getAllUsers } = require('../controllers/users');
const router = express.Router();

router.put('/new-user', loginNewUser);
router.get('/', getAllUsers);

module.exports = router;
