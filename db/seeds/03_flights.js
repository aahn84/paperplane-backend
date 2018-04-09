
const flights = require('./seed_data/flights');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('flights').del()
    .then(() => {
      return knex.raw(
        "SELECT setval('flights_id_seq', 1, FALSE);"
      )
    })
    .then(function () {
      // Inserts seed entries
      return knex('flights').insert(flights);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('flights_id_seq', (SELECT MAX(id) FROM flights));"
      )
    })
};
