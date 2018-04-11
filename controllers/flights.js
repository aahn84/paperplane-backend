const model = require('../models');

function getAllFlights(req, res, next) {
  return model.flights.getAllFlights()
    .then(flights => {
      return res.status(200).json({ data: flights });
    })
    .catch(err => {
    return next({ status: 404, message: `Not found` });
  })
}

function getFlightById(req, res, next) {
  return model.flights.getFlightById(req.params.id)
    .then(flight => {
      return res.status(200).json({ data: flight });
    })
    .catch(err => {
    return next({ status: 404, message: `Flight not found` });
  })
}

function getFlightInfo(req, res, next) {
  const id = req.params.id;
  const { airline_name, flight_num, depart_date } = req.body;
  return model.flights.getFlightInfo(airline_name, flight_num, depart_date, id)
    .then(flight => {
      return res.status(200).json({ data: flight });
    })
    .catch(err => {
      console.log(err);
      return next({ status: 404, message: `Flight not found` });
  })
}

module.exports = {
  getAllFlights,
  getFlightById,
  getFlightInfo,
};
