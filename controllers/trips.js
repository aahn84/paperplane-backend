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

module.exports = {
  getTripById,
};
