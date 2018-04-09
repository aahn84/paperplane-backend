const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.get('/:id', controller.trips.getTripById);

module.exports = router;
