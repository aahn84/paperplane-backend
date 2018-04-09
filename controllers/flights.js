const model = require('../models');

function getFlight(req, res, next) {
  const id = req.params.id;
  const { airline_name, flight_num, depart_date } = req.body;
  return model.flights.getFlight(airline_name, flight_num, depart_date, id)
    .then(flight => {
      return res.status(200).json({ data: flight });
    })
    .catch(err => {
      console.log(err);
      return next({ status: 404, message: `Flight not found` });
  })
}

module.exports = {
  getFlight,
};
