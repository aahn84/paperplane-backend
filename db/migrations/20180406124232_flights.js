
exports.up = function(knex, Promise) {
  return knex.schema.createTable('flights', table => {
    table.increments();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('flights');
};
