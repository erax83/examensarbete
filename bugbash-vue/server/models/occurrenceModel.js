const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const occurrenceModelSchema = new Schema({
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
  browserWindowHeight: { type: Number },
  canvas: { type: String },
});

const OccurrenceModel = mongoose.model("occurrences", occurrenceModelSchema);

module.exports = OccurrenceModel;
