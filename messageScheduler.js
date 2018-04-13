const knex = require('./db/knex');

function getUpcomingFlights() {
  let now = new Date();
  let isoDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60000))
  let later = new Date()
  later.setMinutes(9000);

  // console.log('now', isoDate.toISOString());

  return knex('flights')
    .where('depart_scheduledTime', '>', isoDate.toISOString())
    .andWhere('depart_scheduledTime', '<', later.toISOString())
    .then(flights => {
      // console.log(flights);
      const promises = flights.map(f => {
        console.log(f.depart_scheduledTime, f.id)
        return knex('trips')
          .join('trips_flights', 'trips_flights.trips_id', 'trips.id')
          .join('users', 'users.id', 'trips.user_id')
          .where('trips_flights.flights_id', f.id)
      })

      return Promise.all(promises)
    })
    .then(trips => {
      console.log(trips);
      knex.destroy()
    })
    .catch(err => {
      console.log(err);
    })
}

getUpcomingFlights();
