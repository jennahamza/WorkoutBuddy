// const { Pool } = require('pg');
// const PG_URI = 'postgres://grayosue:XOx7gat8RpsBeuHH1vxVsHKKfG6EwGaS@fanny.db.elephantsql.com/grayosue';
// const pool = new Pool({
//   connectionString: PG_URI
// });
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String, required: true},
});

module.exports = mongoose.model('User', userSchema);



// module.exports = {
//   query: (text, params, callback) => {
//     console.log('executed query', text);
//     return pool.query(text, params, callback)
//   };
// };