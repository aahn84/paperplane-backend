const knex = require('../db/knex');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');


function getTripById(id) {
  return knex('trips')
    .select('*')
    .where('id', id)
    .first()
}

module.exports = {
  getTripById,
};
