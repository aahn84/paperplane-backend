const knex = require('./db/knex');
const twilio = require('twilio');
require('dotenv').config();

function getUpcomingFlights() {
  let now = new Date();
  const timeZoneOffset = 420 //set to PST offset in minutes aka now.getTimezoneOffset()
  let isoDate = new Date(now.getTime() - (timeZoneOffset * 60000))
  let later = new Date()
  later.setMinutes(9000);

  console.log('now', now, now.getTimezoneOffset());
  console.log('corrected', isoDate.toISOString());

  return knex('flights')
    .where('depart_scheduledTime', '>', isoDate.toISOString())
    .andWhere('depart_scheduledTime', '<', later.toISOString())
    .then(flights => {
      console.log('flights', flights);
      const promises = flights.map(f => {
        console.log(f.depart_scheduledTime, f.id)
        return knex('trips')
          .join('trips_flights', 'trips_flights.trips_id', 'trips.id')
          .join('users', 'users.id', 'trips.user_id')
          .where('trips_flights.flights_id', f.id)
          .then(trip => {
            trip.flights = f
            return trip
          })
      })
      return Promise.all(promises)
    })
    .then(trips => {
      console.log('trips', trips);
      sendText()
      knex.destroy()
    })
    .catch(err => {
      console.log(err);
    })
}

function sendText() {
  const accountSid = 'ACffbc19155450aa83dd788cb0a11c3cf5';
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  // require the Twilio module and create a REST client
  const client = require('twilio')(accountSid, authToken);

  client.messages.create(
    {
      to: '+12062907545',
      from: '+12062907545',
      body: 'PAPERPLANE: Your flight is coming up!',
    },
    (err, message) => {
      console.log(message.sid);
    }
  );
}

getUpcomingFlights();
