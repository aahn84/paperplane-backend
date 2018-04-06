const knex = require('../db/knex');
const axios = require('axios');
const BASE_URL = 'https://aviation-edge.com/api/public'

function getFlight(airline_name, flight_num, date) {
  return getAirlineByName(airline_name)
    .then(airline => {
      return axios.get(`${BASE_URL}/routes?key=${process.env.API_KEY}&airlineIata=${airline.codeIataAirline}&flightNumber=${flight_num}`)
    })
    .then(result => {
      console.log(result.data);
      return result.data
    })


  // return knex('flights')
  //   .select('*');
  //   .where('id', id);
  //   .first();
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

module.exports = {
  // signup,
  // login,
  getFlight,
};
