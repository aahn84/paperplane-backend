const model = require('../models');

function getTripById(req, res, next) {
  return model.trips.getTripById(req.params.id)
    .then(trip => {
      return res.status(200).json({ data: trip });
    })
    .catch(err => {
    return next({ status: 404, message: `Trip not found` });
  })
}

function createTrip(req, res, next) {
  const { user_id, title, notes } = req.body;
  return model.trips.createTrip(user_id, title, notes)
    .then(trip => {
      return res.status(201).json({ data: trip });
    })
    .catch(err => {
    return next({ status: 404, message: `Error creating trip.` });
  })
}

module.exports = {
  getTripById,
  createTrip,
};
