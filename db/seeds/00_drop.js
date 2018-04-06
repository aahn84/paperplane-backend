exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trips_flights').del()
  .then(() => {
    return knex('trips').del()
  })
  .then(() => {
    return knex('flights').del();
  })
  .then(()=>{
   return knex('users').del();
  });
};
