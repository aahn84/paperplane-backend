const knex = require('../db/knex');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');


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
            return tripA.flights[0].depart_scheduledTime < tripB.flights[0].depart_scheduledTime
          })
        })
    })
}

function createUser(first_name, last_name, email, password) {
  return knex('users')
    .insert({first_name, last_name, email, password})
    .returning('*')
}

function updateUserById(user_id, first_name, last_name, email, password, notifications_on) {
  return knex('users')
    .update({user_id, first_name, last_name, email, password, notifications_on})
    .where('id', user_id)
    .returning('*')
}

// function signup(user) {
//   let validUser;
//   return getUserByEmail(user.email)
//     .then(existingUser => {
//       if (existingUser) throw 'User already exists';
//       return bcrypt.hash(user.password, parseInt(process.env.WORK_FACTOR));
//     })
//     .then(hashedPassword => {
//       user.password = hashedPassword;
//       return knex('users')
//         .insert(user)
//         .returning('*');
//     })
//     .then(user => {
//       validUser = user[0];
//       return carts.createCart(user[0].id);
//     })
//     .then(cart => {
//       return { user_id: validUser.id, cart_id: cart[0].id };
//     });
// }

// function login(email, password) {
//   let validUser;
//   let claim;
//   return getUserByEmail(email)
//     .then(user => {
//       if (!user) throw 'Please enter a valid username';
//       validUser = user;
//       return bcrypt.compare(password, user.password);
//     })
//     .then(passwordIsValid => {
//       if (!passwordIsValid) throw 'Invalid password provided';
//       claim = { user_id: validUser.id, cart_id: null };
//       return knex('carts')
//         .where('user_id', validUser.id)
//         .andWhere('is_completed', false)
//         .first();
//      })
//     .then(userCart => {
//       claim.cart_id = userCart.id;
//       const token = jwt.sign(claim, process.env.JWT_SECRET, { expiresIn: Date.now() + 2419200 });
//       return { token, claim };
//     });
// }

module.exports = {
  // signup,
  // login,
  getAllUsers,
  getUserById,
  getTripsByUserId,
  createUser,
  updateUserById,
};
