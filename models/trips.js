const knex = require('../db/knex');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

function getAllTrips() {
  return knex('trips')
    .select('*')
    .returning('*')
}

// function getTripByTripId(id) {
//   return knex('trips')
//     .select('*')
//     .where('id', id)
//     .first()
// }

// function getTripsByUserId(id) {
//   // let trips;
//   return knex('trips')
//     // .select('*')
//     .where('user_id', id)
//     .join('trips_flights', 'trips.id', '=', 'trips_flights.trips_id')
//     .join('flights', 'flights.id', '=', 'trips_flights.flights_id')
//     .orderBy('depart_scheduledTime', 'asc')
//     .returning('*')
// }

function createTrip(user_id, title, notes) {
  return knex('trips')
    .insert({user_id, title, notes})
    .returning('*')
}

function updateTrip(id, title, notes) {
  return knex('trips')
    .update({title, notes})
    .where('id', id)
    .returning('*')
}

function deleteTrip(id) {
  return knex('trips')
  .del()
  .where('id', id)
  .returning('*')
}

module.exports = {
  getAllTrips,
  // getTripByTripId,
  // getTripsByUserId,
  createTrip,
  updateTrip,
  deleteTrip,
};
