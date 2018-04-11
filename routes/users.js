const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.get('/', controller.users.getAllUsers);
router.get('/:id', controller.users.getUserById);
router.post('/', controller.users.createUser);
// router.post('/', controller.users.login);
// router.post('/signup', controller.users.signup);
router.put('/:id', controller.users.updateUserById);

module.exports = router;
