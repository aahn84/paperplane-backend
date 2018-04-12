const knex = require('../db/knex');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

function getAllTrips() {
  return knex('trips')
    .select('*')
    .returning('*')
}

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
  createTrip,
  updateTrip,
  deleteTrip,
};
