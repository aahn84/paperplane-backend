const knex = require('./db/knex');
const twilio = require('twilio');
const { promisify } = require('util');
const moment = require('moment');
require('dotenv').config();

function getUpcomingFlights() {
  let now = new Date();
  const timeZoneOffset = 420 //set to PST offset in minutes aka now.getTimezoneOffset()
  let isoDate = new Date(now.getTime() - (timeZoneOffset * 60000))
  let later = new Date()
  later.setMinutes(90);

  return knex('flights')
    .where('depart_scheduledTime', '>', isoDate.toISOString())
    .andWhere('depart_scheduledTime', '<', later.toISOString())
    .andWhere('notification_sent', false)
    .then(flights => {
      const promises = flights.map(f => {
        return knex('trips')
          .join('trips_flights', 'trips_flights.trips_id', 'trips.id')
          .join('users', 'users.id', 'trips.user_id')
          .where('trips_flights.flights_id', f.id)
          .first()
          .then(trip => {
            trip.flights = f;
            return trip
          })
          .catch(console.log)
      })
      return Promise.all(promises)
    })
    .then(trips => {
      const messagePromises = trips.map(trip => {
        return sendText(trip);
      });

      Promise.all(messagePromises)
        .then(res => knex.destroy())
        .catch(err => knex.destroy())
    })
    .catch(err => {
      console.log(err);
    })
}

function sendText(trip) {
  const accountSid = 'ACffbc19155450aa83dd788cb0a11c3cf5';
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const user_phone = trip.phone
  const user_message = `Your flight ${trip.flights.airline_iata}${trip.flights.flight_num} is departing from ${trip.flights.depart_airport} - Terminal: ${trip.flights.depart_terminal}, Gate: ${trip.flights.depart_gate} soon!`;

  // require the Twilio module and create a REST client
  const client = require('twilio')(accountSid, authToken);
  const pCreate = promisify(client.messages.create).bind(client.messages)
  return pCreate({
    to: `+1${user_phone}`,
    from: '+12536566852',
    body: `PAPERPLANE: ${user_message}`,
  })
  .then(res => {
    return knex('flights')
      .update({ notification_sent: true })
      .where('id', trip.flights.id)
      .then(console.log)
      .catch(console.error)
  })
  .catch(console.error)
}

getUpcomingFlights();
