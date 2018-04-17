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
  return bcrypt.hash(user.password, parseInt(process.env.WORK_FACTOR))
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
    .catch(err => {
      res.json({err: err})
      console.log(err);
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
      )
      console.log('RETURNEDTOKEN', token);
      return token;
    })
    .catch(err => {
      console.log(err);
    })
}


module.exports = {
  signup,
  login,
  getAllUsers,
  getUserById,
  updateUserById,
};
