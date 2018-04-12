const knex = require('../db/knex');
const axios = require('axios');
const BASE_URL = 'https://aviation-edge.com/api/public'

function getAllFlights() {
  return knex('flights')
    .select('*')
}

function getFlightById(id) {
  return knex('flights')
    .select('*')
    .where('id', id)
    .first()
}

function getFlightInfo(airline_name, flight_num, depart_date, trip_id) {
  let airline;
  let route;

  return getAirlineByName(airline_name)
    .then(airlineResult => {
      airline = airlineResult
      return axios.get(`${BASE_URL}/routes?key=${process.env.API_KEY}&airlineIata=${airline.codeIataAirline}&flightNumber=${flight_num}`)
    })
    .then(routeResult => {
      route = routeResult.data[0]
      // const flight = airline.codeIataAirline + flight_num
      // return axios.get(`${BASE_URL}/flights?key=${process.env.API_KEY}&flight[iataNumber]=${flight}`)
      return axios.get(`${BASE_URL}/timetable?key=${process.env.API_KEY}&type=departure&iataCode=${route.departureIata}`)
    })
    .then(departures => {
      const foundDeparture = departures.data.find(d => {
        return d.flight.number == flight_num
      })
      // console.log(foundDeparture);
      const flight = {
        airline_callsign: airline.callsign,
        airline_iata: airline.codeIataAirline,
        flight_num,
        depart_airport: foundDeparture.departure.iataCode,
        depart_date,
        depart_time: route.departureTime,
        // depart_gmt:
        depart_terminal: foundDeparture.departure.terminal,
        depart_gate: foundDeparture.departure.gate,
        depart_scheduledTime: foundDeparture.departure.scheduledTime,
        depart_estimatedTime: foundDeparture.departure.estimatedTime,
        depart_status: foundDeparture.status,
        arrive_airport: foundDeparture.arrival.iataCode,
        // arrive_date:
        arrive_time: route.arrivalTime,
        // arrive_gmt:
        arrive_terminal: foundDeparture.arrival.terminal,
        arrive_gate: foundDeparture.arrival.gate,
        baggage_claim: foundDeparture.arrival.baggage,
        arrive_scheduledTime: foundDeparture.arrival.scheduledTime,
        arrive_estimatedTime: foundDeparture.arrival.estimatedTime,
        arrive_status: foundDeparture.delay,
      }
      return knex('flights')
        .insert(flight)
        .returning('*')

    })
    .then(insertedFlight => {
      // console.log('Insert trip_flight', insertedFlight);
      return knex('trips_flights')
        .insert({
          trips_id: trip_id,
          flights_id: insertedFlight[0].id,
        })
        .returning('*')
    })

}

function getAirlineByName(airline_name)  {
  return axios.get(`${BASE_URL}/airlineDatabase?key=${process.env.API_KEY}&codeIso2Country=US`)
    .then(result => {
      const airlines = result.data.filter(a => a.type.includes('scheduled') && a.codeIataAirline) // may need to filter for 'active' airlines only && a.statusAirline === 'active'
      const match = airlines.find(a => a.nameAirline.toLowerCase().includes(airline_name.toLowerCase()))

      return match
    })
    .catch(console.error)
}

function deleteFlight(flights_id, trips_id) {
  return knex('flights')
  .del()
  .where('id', flights_id)
  // .where({
  //   id: flights_id
  // })
  .returning('*')
}

module.exports = {
  getAllFlights,
  getFlightById,
  getFlightInfo,
  deleteFlight,
};
