var db = require('../mongoose');

var catSchema = new db.Schema({
  name: String,
  age: Number,
  status: String
});

module.exports = db.model('Cats', catSchema);
