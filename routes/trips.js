const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.get('/:id', controller.trips.getTripById);
router.post('/', controller.trips.createTrip);

module.exports = router;
