const knex = require('../db/knex');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');


function getTripById(id) {
  return knex('trips')
    .select('*')
    .where('id', id)
    .first()
}

function createTrip(user_id, title, notes) {
  return knex('trips')
    .insert({user_id, title, notes})
    .returning('*')
}

module.exports = {
  getTripById,
  createTrip,
};
