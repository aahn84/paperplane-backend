const model = require('../models');

function getAllTrips(req, res, next) {
  return model.trips.getAllTrips()
    .then(trips => {
      return res.status(200).json(trips);
    })
    .catch(err => {
    return next({ status: 404, message: `Not found` });
  })
}

function getTripsByUserId(req, res, next) {
  return model.trips.getTripsByUserId(req.claim.user_id)
    .then(trips => {
      return res.status(200).json(trips);
    })
    .catch(err => {
    return next({ status: 404, message: `Trips not found` });
  })
}

function createTrip(req, res, next) {
  const user_id = req.claim.user_id;
  const { title, notes } = req.body;
  return model.trips.createTrip(user_id, title, notes)
    .then(trip => {
      return res.status(201).json(trip);
    })
    .catch(err => {
    return next({ status: 404, message: `Error creating trip.` });
  })
}

function updateTrip(req, res, next) {
  const id = req.params.id;
  return model.trips.updateTrip(id, req.body)
    .then(trip => {
      return res.status(201).json(trip);
    })
    .catch(err => {
    return next({ status: 404, message: `Error updating trip ${id}.` });
  })
}

function deleteTrip(req, res, next) {
  const trip_id = req.params.id
  return model.trips.deleteTrip(trip_id)
    .then(trip => {
      return res.status(200).json(trip);
    })
    .catch(err => {
    return next({ status: 404, message: `Error deleting trip ${id}.` });
  })
}


module.exports = {
  getAllTrips,
  getTripsByUserId,
  createTrip,
  updateTrip,
  deleteTrip,
};
