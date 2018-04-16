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

// function getTripByTripId(req, res, next) {
//   return model.trips.getTripById(req.params.id)
//     .then(trip => {
//       return res.status(200).json({ data: trip });
//     })
//     .catch(err => {
//     return next({ status: 404, message: `Trip not found` });
//   })
// }

function getTripsByUserId(req, res, next) {
  console.log('CLAIM', req.claim);
  return model.trips.getTripsByUserId(req.claim.user_id)
    .then(trips => {
      return res.status(200).json(trips);
    })
    .catch(err => {
    return next({ status: 404, message: `Trips not found` });
  })
}

function createTrip(req, res, next) {
  const { user_id, title, notes } = req.body;
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
  // const { title, notes } = req.body;
  return model.trips.updateTrip(id, req.body)
    .then(trip => {
      return res.status(201).json(trip);
    })
    .catch(err => {
    return next({ status: 404, message: `Error updating trip ${id}.` });
  })
}

function deleteTrip(req, res, next) {
  const id = req.params.id
  return model.trips.deleteTrip(id)
    .then(trip => {
      return res.status(200).json(trip);
    })
    .catch(err => {
    return next({ status: 404, message: `Error deleting trip ${id}.` });
  })
}


module.exports = {
  getAllTrips,
  // getTripByTripId,
  getTripsByUserId,
  createTrip,
  updateTrip,
  deleteTrip,
};
