const knex = require('../db/knex');

function getAllTrips() {
  return knex('trips')
    .select('*')
    .returning('*')
}

function getTripsByUserId(id) {
  return knex('trips')
    .where('user_id', id)
    .then(trips => {
      const promises = trips.map(trip => {
        return knex('flights')
          .join('trips_flights', 'trips_flights.flights_id', 'flights.id')
          .where('trips_flights.trips_id', trip.id)
          .orderBy('depart_scheduledTime', 'asc')
          .then(flights => {
            trip.flights = flights
            return trip;
          })
      })
      return Promise.all(promises)
        .then(trips => {
          return trips.sort((tripA, tripB) => {
            if (tripA.flights.length === 0 && tripB.flights.length === 0) {
              return true
            }

            if (tripA.flights.length === 0) {
              return false
            }

            if (tripB.flights.length === 0) {
              return true
            }

            return tripA.flights[0].depart_scheduledTime < tripB.flights[0].depart_scheduledTime
          })
        })
        .catch(err => {
          console.log(err)
        })

    })
}

function createTrip(user_id, title, notes) {
  return knex('trips')
    .insert({user_id, title, notes})
    .returning('*')
}

function updateTrip(id, updateObject) {
  return knex('trips')
    .update(updateObject)
    .where('id', id)
    .returning('*')
}

function deleteTrip(id) {
  return knex('trips')
  .del()
  .where('id', id)
  .returning('*')
}

module.exports = {
  getAllTrips,
  getTripsByUserId,
  createTrip,
  updateTrip,
  deleteTrip,
};
