const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monitorModelSchema = new Schema({
  stack: { type: String },
  timeStamp: { type: String },
  fileName: { type: String },
  startdate: { type: String },
  duration: { type: String },
  url: { type: String },
});

const Monitor = mongoose.model("monitorerrors", monitorModelSchema);

module.exports = Monitor;
