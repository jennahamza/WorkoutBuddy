const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const activitySchema = new Schema({
  nameID: {type: String, required: true},
  date: {type: String, required: true},
  activity: {type: String, required: true},
  duration: {type: Number, required: false},
  effort: {type: String, required: false}
});

module.exports = mongoose.model('Activity', activitySchema);