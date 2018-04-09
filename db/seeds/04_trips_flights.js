
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trips_flights').del()
    .then(function () {
      // Inserts seed entries
      return knex('trips_flights').insert([
        {id: 1, trips_id: 1, flights_id: 1},
        {id: 2, trips_id: 1, flights_id: 2},
        // {id: 3, trips_id: 2, flights_id: 1},
        // {id: 4, trips_id: 3, flights_id: 3},
        // {id: 5, trips_id: 4, flights_id: 2},
        // {id: 6, trips_id: 5, flights_id: 2},
        // {id: 7, trips_id: 6, flights_id: 1},
        // {id: 8, trips_id: 7, flights_id: 3},
        // {id: 9, trips_id: 7, flights_id: 1},
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('trips_flights_id_seq', (SELECT MAX(id) FROM trips_flights));"
      )
    })
};
