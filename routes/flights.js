const express = require('express');
const controller = require('../controllers');
const authorize = require('./authMiddleware');

const router = express.Router();

router.get('/', controller.flights.getAllFlights);
router.get('/:id', authorize, controller.flights.getFlightById);
router.post('/:id', controller.flights.getFlightInfo);
router.delete('/:id', controller.flights.deleteFlight)
// router.delete('/:id', authorize, controller.flights.deleteFlight)

module.exports = router;
