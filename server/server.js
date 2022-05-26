const path = require('path');
const express = require('express');
const app = express();
const apiRouter = require('./api');
const PORT = 3000;

const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://jhamza:1091Jshh@cluster0.h6dwc.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, dbName: 'solo'});
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

// parse request body
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// serve static files
app.use('/client', express.static(path.resolve(__dirname, '../client')));
// define route handlers
app.use('/api', apiRouter);
  // catch-all route handler
app.use((req, res) => res.status(404).send('Oops... page not found.'));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'Sorry, an unknown error occurred. :('}
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;