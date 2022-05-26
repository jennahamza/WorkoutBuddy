const User = require('../models/userModel.js');
const userController = {};

userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return next({
      log: 'error in getAllUsers middleware',
      message: { err: `getAllUsers had the following error: ${err}` }
    });
    res.locals.users = users;
    return next();
  });
};

userController.createUser = (req, res, next) => {

};

module.exports = userController;