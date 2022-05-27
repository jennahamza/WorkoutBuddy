const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');

const userController = require('./controllers/userController');
const activityController = require('./controllers/activityController');
const app = require('./server');

// make a router request to username endpoint so user can get all their activity data
router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
})

router.post('/', activityController.getUserID, activityController.logActivity, (req, res) => {
    res.status(200).send('added activity');
});

// router.post('/log', activityController.getActivityLog, (req, res) => {
//   res.status(200).json(res.locals.activities);
// });

router.get('/log', activityController.getUserID, activityController.getActivityLog, (req, res) => {
  console.log('res.locals.activities: ', res.locals.activities);
  res.status(200).json(res.locals.activities);
});

router.get('/activitylog', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/log.html'));
});

router.get('/setuser', userController.verifyUser, userController.createUser, (req, res) => {
  res.status(200).send('set user');
});

module.exports = router;