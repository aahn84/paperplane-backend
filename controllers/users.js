const model = require('../models');

// function signup (req, res, next) {
//     let { first_name, last_name, email, password } = req.body;
//     if (!first_name || !last_name || !email || !password) {
//         return next({ status: 400, message: 'Missing signup fields.' });
//     }
//     return model.users.signup(req.body)
//         .then(newUserPayload => {
//             return res.status(200).json({ data: newUserPayload });
//         })
//         .catch(err => {
//             console.log(err);
//             return next({ status: 401, message: err });
//         })
// }
//
// function login (req, res, next) {
//     let { email, password } = req.body;
//     if (!email || !password) {
//         return next({ status: 400, message: 'Missing login fields.' });
//     }
//     return model.users.login(email, password)
//         .then(tokenPkg => {
//             return res.set('Auth', `Bearer: ${tokenPkg.token}`).send({ message: 'Login Successful', claim: tokenPkg.claim });
//         })
//         .catch(err => {
//             return next({ status: 403, message: err });
//         });
// }

function getAllUsers(req, res, next) {
  return model.users.getAllUsers()
    .then(users => {
      return res.status(200).json({ data: users });
    })
    .catch(err => {
    return next({ status: 404, message: `Not found` });
  })
}

function getUserById(req, res, next) {
  // const id = req.body;
  return model.users.getUserById(req.params.id)
    .then(user => {
      return res.status(200).json({ data: user });
    })
    .catch(err => {
    return next({ status: 404, message: `User not found` });
  })
}

function getTripsByUserId(req, res, next) {
  return model.users.getTripsByUserId(req.params.id)
    .then(trips => {
      return res.status(200).json({ data: trips });
    })
    .catch(err => {
    return next({ status: 404, message: `Trips not found` });
  })
}

function createUser(req, res, next) {
  const { first_name, last_name, email, password } = req.body;
  return model.users.createUser(user_id, title, notes)
    .then(user => {
      return res.status(201).json({ data: user });
    })
    .catch(err => {
    return next({ status: 404, message: `Error creating user.` });
  })
}

function updateUserById(req, res, next) {
  const id = req.params.id;
  // const { user_id, first_name, last_name, email, password, notifications_on } = req.body
  return model.users.getUserById(id, req.body)
    .then(user => {
      return res.status(201).json({ data: user });
    })
    .catch(err => {
    return next({ status: 404, message: `User not found` });
  })
}

module.exports = {
  // signup,
  // login,
  getAllUsers,
  getUserById,
  getTripsByUserId,
  createUser,
  updateUserById,
};
