const knex = require('./db/knex');
const twilio = require('twilio');
require('dotenv').config();

function getUpcomingFlights() {
  let now = new Date();
  const timeZoneOffset = 420 //set to PST offset in minutes aka now.getTimezoneOffset()
  let isoDate = new Date(now.getTime() - (timeZoneOffset * 60000))
  let later = new Date()
  later.setMinutes(9000);

  // console.log('now', now, now.getTimezoneOffset());
  // console.log('corrected', isoDate.toISOString());

  return knex('flights')
    .where('depart_scheduledTime', '>', isoDate.toISOString())
    .andWhere('depart_scheduledTime', '<', later.toISOString())
    .andWhere('bording_notification', false)
    .then(flights => {
      // console.log('flights', flights);
      const promises = flights.map(f => {
        // console.log(f.depart_scheduledTime, f.id)
        return knex('trips')
          .join('trips_flights', 'trips_flights.trips_id', 'trips.id')
          .join('users', 'users.id', 'trips.user_id')
          .where('trips_flights.flights_id', f.id)
          .then(trip => {
            trip.flights = f;
            return trip
          })
      })
      return Promise.all(promises)
    })
    .then(trips => {
      console.log('TRIPS', trips);
      // const tripMessages = trips.map(trip => {
      //   const tripMessage = {};
      //   tripMessage.phone = trip[0].phone;
      //   tripMessage.message =
      //   return tripMessage;
      // });
      trips.forEach(trip => {
        sendText(trip);
      });
    })
    .catch(err => {
      console.log(err);
    })
}

function sendText(trip) {
  const accountSid = 'ACffbc19155450aa83dd788cb0a11c3cf5';
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const user_phone = trip[0].phone
  const user_message = `Your flight ${trip.flights.airline_iata}${trip.flights.flight_num} is departing from ${trip.flights.depart_airport} - Terminal: ${trip.flights.depart_terminal}, Gate: ${trip.flights.depart_gate} soon!`;

  // require the Twilio module and create a REST client
  const client = require('twilio')(accountSid, authToken);

  client.messages.create(
    {
      to: `+1${user_phone}`,
      from: '+12536566852',
      body: `PAPERPLANE: ${user_message}`,
    },
    (err, message) => {
      if(err) return console.error(err);
      console.log(message);
      // update flight bording_notification to true
      // !!!!HOW DO I RESOLVE SO IT DOESN'T SEND EVERY 10 MINUTES???
    }
  );
}

getUpcomingFlights();
