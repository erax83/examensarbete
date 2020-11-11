const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MonitorModel = new Schema ({
  message: { type: String, required: true }
});

module.exports = mongoose.model('MonitorModel', MonitorModelSchema);