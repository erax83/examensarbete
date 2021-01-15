const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monitorModelSchema = new Schema({
  message: { type: String },
  hashNumber: { type: String }
});

const HashModel = mongoose.model("monitorhash", monitorModelSchema);

module.exports = HashModel;
