const express = require('express');
const controller = require('../controllers');
const router = express.Router();
// const router = express.Router({ mergeParams: true });
const authorize = require('./authMiddleware');

router.post('/signup', controller.auth.signup);
router.post('/login', controller.auth.login);

module.exports = router;
