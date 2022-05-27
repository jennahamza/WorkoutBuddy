const Activity = require('../models/activityModel.js');
const User = require('../models/userModel');
const activityController = {};

activityController.getUserID = async (req, res, next) => {
  let name;
  if (req.body.name) {
    name = req.body.name;
  }
  else if (req.query.name) {
    name = req.query.name;
  }
  console.log('req body to getuserID:', req.body, req.query);
  await User.findOne ( { name: name.toLowerCase() }, (err, user) => {
    if (user) {
      console.log('found user: ', user);
      res.locals.nameID = user._id;
      return next();
    };
    if (err) return next('Error in activityController.getUserID: ' + JSON.stringify(err))
  })
}

activityController.logActivity = async (req, res, next) => {
  console.log('req.body to logActivity: ', req.body)
  console.log('res.locals.nameID: ', res.locals.nameID);
  const { date, activity, duration, effort } = req.body;
  // console.log('req body', req.body);
  // if ( !name || !date || !activity) { 
  //   return next({ err: 'Name, Date & Activity are required fields.'});
  // };
  // if (typeof name !== 'string' || typeof date !== 'string' || typeof duration !== 'number') {
  //   return next({ err: 'invalid data type.'})
  // }
  const newActivity = await Activity.create({
    nameID: res.locals.nameID,
    date: date,
    activity: activity,
    duration: duration,
    effort: effort
  })
  res.locals.newActivity = newActivity;
  console.log('reslocals new Activity', res.locals.newActivity);
  return next();
};

activityController.getActivityLog = async (req, res, next) => {
  console.log('req.query: ', req.query);
  const { name } = req.query;
  await User.find({ name: name.toLowerCase() }, (err, user) => {
    if (err) return next('Error in activityController.getActivityLog: ', JSON.stringify(err));
    console.log('user: ', user);
    res.locals.nameID = user[0]._id;
  })
  console.log('res.locals.nameID: ', res.locals.nameID);
  Activity.find({ nameID: res.locals.nameID }, (err, activities) => {
    if (err) return next('Error in activityController.getActivityLog: ', JSON.stringify(err));
    res.locals.activities = activities;
    console.log('getting activities from db');
    // res.redirect(302, '/activitylog')
    return next();
  })
}


module.exports = activityController;