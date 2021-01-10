const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monitorModelSchema = new Schema({
  message: { type: String },
  stack: { type: String },
  timeStamp: { type: Number },
  fileName: { type: String },
  session: {
    startDate: { type: Date },
    duration: { type: String },
    url: { type: String },
  },
  language: { type: String },
  plugins: { type: Array },
  browserWindowWidth: { type: String },
  browserWindowHeight: { type: String }
});

const Monitor = mongoose.model("monitorerrors", monitorModelSchema);

module.exports = Monitor;
