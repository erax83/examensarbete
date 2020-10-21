const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestError = new Schema ({
  name: { type: String, required: true, index: { unique: true } },
});

module.exports = mongoose.model('TestError', TestError)