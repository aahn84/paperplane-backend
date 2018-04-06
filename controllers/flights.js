const model = require('../models');

function getFlight(req, res, next) {
  const { airline_name, flight_num, date } = req.body;
  return model.flights.getFlight(airline_name, flight_num, date)
    .then(flight => {
      return res.status(200).json({ data: flight });
    })
    .catch(err => {
    return next({ status: 404, message: `Flight not found` });
  })
}

module.exports = {
  getFlight,
};
