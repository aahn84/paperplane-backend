const express = require('express');
const controller = require('../controllers');
const authorize = require('./authMiddleware');

const router = express.Router();

router.get('/', authorize, controller.trips.getTripsByUserId);
// router.get('/', controller.trips.getAllTrips);
// router.get('/:id', controller.trips.getTripByTripId);
// router.get('/:id', controller.trips.getTripsByUserId);
router.post('/', authorize, controller.trips.createTrip);
router.patch('/:id', authorize, controller.trips.updateTrip);
router.delete('/:id', authorize, controller.trips.deleteTrip);

module.exports = router;
