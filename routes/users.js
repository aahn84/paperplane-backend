const express = require('express');
const controller = require('../controllers');
const router = express.Router();
const authorize = require('./authMiddleware');

// router.get('/', controller.users.getAllUsers);
router.get('/', authorize, controller.users.getUserById);
router.get('/:id', authorize, controller.users.getUserById);
router.patch('/:id', authorize, controller.users.updateUserById);

module.exports = router;
