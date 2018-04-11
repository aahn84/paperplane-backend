
const users = require('./seed_data/users');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    // Inserts seed entries
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', 1, FALSE)"
      )
    })
    .then(function () {
      return knex('users').insert(users);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      )
    })
};
