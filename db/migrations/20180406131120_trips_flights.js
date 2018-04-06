
exports.up = function(knex, Promise) {
  return knex.schema.createTable('trips_flights', table => {
    table.increments();
    table.integer('trips_id').notNullable();
    table.foreign('trips_id').references('trips.id');
    table.integer('flights_id').notNullable();
    table.foreign('flights_id').references('flights.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('trips_flights');
};
