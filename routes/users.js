const express = require('express');
const controller = require('../controllers');
const router = express.Router();
const authorize = require('./authMiddleware');

router.get('/', controller.users.getAllUsers);
router.get('/:id', authorize, controller.users.getUserById);
router.get('/:id/trips', authorize, controller.users.getTripsByUserId);
// router.get('/:id/trips/:tripId', authorize, controller.users.getTripsByTripId);

// router.post('/', authorize, controller.users.createUser);
// router.post('/', authorize, controller.users.login);
// router.post('/signup', authorize, controller.users.signup);

router.patch('/:id', authorize, controller.users.updateUserById);

module.exports = router;
