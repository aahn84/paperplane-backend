const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.get('/', controller.users.getAllUsers);
router.get('/:id', controller.users.getUserById);
router.get('/:id/trips', controller.users.getTripsByUserId);
// router.get('/:id/trips/:tripId', controller.users.getTripsByTripId);

router.post('/', controller.users.createUser);
// router.post('/', controller.users.login);
// router.post('/signup', controller.users.signup);

router.patch('/:id', controller.users.updateUserById);

module.exports = router;
