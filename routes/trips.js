const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.get('/', controller.trips.getAllTrips);
// router.get('/:id', controller.trips.getTripByTripId);
router.get('/:id', controller.trips.getTripsByUserId);
router.post('/', controller.trips.createTrip);
router.patch('/:id', controller.trips.updateTrip);
router.delete('/:id', controller.trips.deleteTrip);

module.exports = router;
