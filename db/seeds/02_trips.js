
const trips = require('./seed_data/trips');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trips').del()
    .then(function () {
      // Inserts seed entries
      return knex('trips').insert(trips);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('trips_id_seq', (SELECT MAX(id) FROM trips));"
      )
    })
};
