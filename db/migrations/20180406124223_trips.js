
exports.up = function(knex, Promise) {
  return knex.schema.createTable('trips', table => {
    table.increments();
    table.string('title').notNullable().defaultTo('New Trip');
    table.string('notes');
    table.integer('user_id').notNullable();
    table.foreign('user_id').references('users.id');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('trips');
};
