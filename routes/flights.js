const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.get('/', controller.flights.getAllFlights);
router.get('/:id', controller.flights.getFlightById);
router.post('/:id', controller.flights.getFlightInfo);

module.exports = router;
