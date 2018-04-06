const knex = require('../db/knex');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const carts = require('./carts');

// const users = [
//   {
//     id: 1,
//     first_name: 'Angela',
//     last_name: 'Ahn',
//     email: 'aahn84@gmail.com',
//     password: 'password',
//     notifications: true,
//   },
//   {
//     id: 2,
//     first_name: 'Beyonce',
//     last_name: 'Knowles',
//     email: 'b@beyonce.com',
//     password: 'queenbee',
//     notifications: false,
//   },
// ]

function getUserByEmail(email) {
  return knex('users')
    .select('*')
    .where('email', email)
    .first();
}

function getUserById(id) {
  return knex('users')
    .select('*')
    .where('id', id)
    .first();
}

// function getUserById(id) {
//   console.log(users);
//   return users.find(user => user.id === id);
// }

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
  getUserById,
};
