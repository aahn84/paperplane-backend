const model = require('../models');

function signup(req, res, next) {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return next({ status: 400, message: 'Missing fields.' });
  }
  return model.users.signup(req.body)
    .then(token => {
      return res.set('Auth', `Bearer: ${token}`)
        .send({ message: 'Sign up successful.' });
    })
    .catch(err => {
      console.log('ERROR: ', err);
      return next({ status: 401, message: 'Error creating user.' });
    });
}

function login(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return next({ status: 400, message: 'Missing fields.' });
  }
  return model.users.login(email, password)
    .then(token => {
      return res.set('Auth', `Bearer: ${token}`)
        .send({ message: 'Login successful.' });
    })
    .catch(err => {
      console.log('ERROR: ', err);
      return next({ status: 403, message: `Error logging in user.` });
    });
}

module.exports = {
  signup,
  login,
};
