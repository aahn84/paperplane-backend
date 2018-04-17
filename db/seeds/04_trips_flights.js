
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trips_flights').del()
    .then(() => {
      return knex.raw(
        "SELECT setval('trips_flights_id_seq', 1, FALSE)"
      )
    })
    .then(function () {
      // Inserts seed entries
      return knex('trips_flights').insert([
        {trips_id: 1, flights_id: 1},
        // {trips_id: 1, flights_id: 3},
        {trips_id: 2, flights_id: 4},
        {trips_id: 2, flights_id: 3},
        {trips_id: 3, flights_id: 4},
        {trips_id: 4, flights_id: 5},
        {trips_id: 5, flights_id: 7},
        {trips_id: 6, flights_id: 6},
        {trips_id: 7, flights_id: 8},
        {trips_id: 7, flights_id: 9},
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('trips_flights_id_seq', (SELECT MAX(id) FROM trips_flights));"
      )
    })
};
