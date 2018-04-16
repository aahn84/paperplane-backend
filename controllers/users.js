const model = require('../models');

function getAllUsers(req, res, next) {
  return model.users.getAllUsers()
    .then(users => {
      return res.status(200).json(users);
    })
    .catch(err => {
    return next({ status: 404, message: `Not found` });
  })
}

function getUserById(req, res, next) {
  const id = req.claim.user_id;
  return model.users.getUserById(id)
    .then(user => {
      console.log(user);
      return res.status(200).json(user);
    })
    .catch(err => {
    return next({ status: 404, message: `User not found` });
  })
}

// function getTripsByUserId(req, res, next) {
//   return model.users.getTripsByUserId(req.params.id)
//     .then(trips => {
//       return res.status(200).json(trips);
//     })
//     .catch(err => {
//     return next({ status: 404, message: `Trips not found` });
//   })
// }

// function createUser(req, res, next) {
//   const { first_name, last_name, email, password } = req.body;
//   return model.users.createUser(user_id, title, notes)
//     .then(user => {
//       return res.status(201).json({ data: user });
//     })
//     .catch(err => {
//     return next({ status: 404, message: `Error creating user.` });
//   })
// }

function updateUserById(req, res, next) {
  const id = req.params.id;
  return model.users.updateUserById(id, req.body)
    .then(user => {
      return res.status(201).json(user);
    })
    .catch(err => {
      return next({ status: 404, message: `Error creating user.` });
    })
}

module.exports = {
  // signup,
  // login,
  getAllUsers,
  getUserById,
  // getTripsByUserId,
  // createUser,
  updateUserById,
};
