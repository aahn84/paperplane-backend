
exports.up = function(knex, Promise) {
  return knex.schema.createTable('flights', table => {
    table.increments();
    table.string('airline_callsign').notNullable();
    table.string('airline_iata').notNullable();
    table.string('flight_num').notNullable();
    table.string('depart_airport').notNullable();
    table.string('depart_date').notNullable();
    table.string('depart_time')
    table.string('depart_gmt')
    table.string('depart_terminal').defaultTo('Not Assigned');
    table.string('depart_gate').defaultTo('Not Assigned');
    table.string('depart_scheduledTime').notNullable();
    table.string('depart_estimatedTime')
    table.string('depart_actualTime')
    table.string('depart_status')
    table.string('arrive_airport').notNullable();
    table.string('arrive_date');
    table.string('arrive_time')
    table.string('arrive_gmt')
    table.string('arrive_terminal').defaultTo('Not Assigned');
    table.string('arrive_gate').defaultTo('Not Assigned');
    table.string('baggage_claim').defaultTo('Not Assigned');
    table.string('arrive_scheduledTime').notNullable();
    table.string('arrive_estimatedTime')
    table.string('arrive_actualTime')
    table.string('arrive_status')
    table.string('aircraft_info').defaultTo('Not Assigned');
    table.string('flight_status').notNullable().defaultTo('TBA');
    table.boolean('bording_notification').defaultTo(false);
    table.string('updated').notNullable().defaultTo('TBA');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('flights');
};
