
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          first_name: 'Bingo',
          last_name: 'Scout',
          email: 'scout@bingo.com',
          password: '123'
        },
      ]);
    });
};
