const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monitorModelSchema = new Schema({
  message: { type: String },
  hashNumber: { type: String },
  stack: { type: String },
  timeStamp: { type: Number },
  fileName: { type: String },
  session: {
    startDate: { type: Date },
    duration: { type: Number },
    url: { type: String },
  },
  language: { type: String },
  plugins: { type: Array },
  browserWindowWidth: { type: Number },
  browserWindowHeight: { type: Number }
});

const Monitor = mongoose.model("occurrences", monitorModelSchema);

module.exports = Monitor;
