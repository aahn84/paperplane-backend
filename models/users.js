const knex = require('../db/knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


function getAllUsers() {
  return knex('users')
    .select('*')
}

function getUserById(id) {
  return knex('users')
    .select('*')
    .where('id', id)
    .first()
}

function getUserByEmail(email) {
  return knex('users')
    .where('email', email)
    .first()
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

// function createUser(first_name, last_name, email, password) {
//   return knex('users')
//     .insert({first_name, last_name, email, password})
//     .returning('*')
// }

function updateUserById(id, updateObject) {
  return knex('users')
    .update(updateObject)
    .where('id', id)
    .returning('*')
    .then(res => {
      return res
    })
}

function signup(user) {
  let validUser;
  return getUserByEmail(user.email)
    .then(existingUser => {
      if (existingUser) throw 'User already exists';
      return bcrypt.hash(user.password, parseInt(process.env.WORK_FACTOR));
    })
    .then(hashedPassword => {
      user.password = hashedPassword;
      return knex('users')
        .insert(user)
        .returning('*')
    })
    .then(user => {
      const claim = { user_id: user[0].id };
      const fourWeeks = 2419200000;
      const token = jwt.sign(
        claim,
        process.env.JWT_SECRET,
        { expiresIn: Date.now() + fourWeeks }
      );
      return token;
    })
}

function login(email, password) {
  let validUser;
  return getUserByEmail(email)
    .then(user => {
      if (!user) throw 'Please enter a valid email.';
      validUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(passwordIsValid => {
      if (!passwordIsValid) throw 'Password invalid.';
      const claim = { user_id: validUser.id };
      const fourWeeks = 2419200000;
      const token = jwt.sign(
        claim,
        process.env.JWT_SECRET,
        { expiresIn: Date.now() + fourWeeks }
      );
      return token;
    })
}


module.exports = {
  signup,
  login,
  getAllUsers,
  getUserById,
  getTripsByUserId,
  // createUser,
  updateUserById,
};
