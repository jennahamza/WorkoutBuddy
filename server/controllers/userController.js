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

userController.verifyUser = async (req, res, next) => {
  const { name } = req.query; 
  console.log('name: ', name)
  await User.findOne ({name: name.toLowerCase()}, async (err, users) => {
    if (!users) return next();
    else  {
      console.log('user: ', users._doc);
      console.log('user exists');
      res.locals.userID = users._doc._id;
      return next();
    };
    if (err) return next('Error in userController.verifyUser: ' + JSON.stringify(err));
  });
};

userController.createUser = async (req, res, next) => {
  const { name } = req.query;
  console.log('name - createUser', name);
  await User.findOne ({name: name.toLowerCase()}, async (err, users) => {
    if (users) {
      console.log('users', users);
      return next();
    } else if (!users) {
      const newUser = await User.create({ name: name.toLowerCase() });
      res.locals.newUser = newUser;
      console.log('newUser: ', newUser);
      return next();
    };
    if (err) return next('Error in userController.createUser: ' + JSON.stringify(err));
  });
};

module.exports = userController;