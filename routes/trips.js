const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.get('/', controller.trips.getAllTrips);
router.get('/:id', controller.trips.getTripById);
router.post('/', controller.trips.createTrip);
router.delete('/:id', controller.trips.deleteTrip);

module.exports = router;
