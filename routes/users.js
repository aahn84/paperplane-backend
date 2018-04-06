const express = require('express');
const controller = require('../controllers');

const router = express.Router();

// router.post('/signup', controller.users.signup);
// router.post('/login', controller.users.login);
router.get('/:id', controller.users.getUserById);

module.exports = router;
