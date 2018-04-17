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

function updateUserById(req, res, next) {
  const id = req.claim.user_id;
  return model.users.updateUserById(id, req.body)
    .then(user => {
      return res.status(201).json(user);
    })
    .catch(err => {
      return next({ status: 404, message: `Error creating user.` });
    })
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
};
