const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoundError = new Schema ({
  message: { type: String, required: true }
});

module.exports = mongoose.model('FoundError', FoundError);