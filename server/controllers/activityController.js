const Activity = require('../models/activityModel.js');
const activityController = {};

activityController.logActivity = async (req, res, next) => {
  const { name, date, activity, duration, effort } = await req.body;
  // console.log('req body', req.body);
  // if ( !name || !date || !activity) { 
  //   return next({ err: 'Name, Date & Activity are required fields.'});
  // };
  // if (typeof name !== 'string' || typeof date !== 'string' || typeof duration !== 'number') {
  //   return next({ err: 'invalid data type.'})
  // }
  const newActivity = await Activity.create({
    name: name,
    date: date,
    activity: activity,
    duration: duration,
    effort: effort
  })
  res.locals.newActivity = newActivity;
  console.log('reslocals new Activity', res.locals.newActivity);
  return next();
};

activityController.getActivityLog = (req, res, next) => {
  Activity.find({}, (err, activities) => {
    if (err) return next('Error in activityController.getActivityLog: ', JSON.stringify(err));
    res.locals.activities = activities;
    console.log('getting activities from db');
    return next();
  })
}


module.exports = activityController;