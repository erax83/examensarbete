const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const errorModelSchema = new Schema({
  message: { type: String },
  hashNumber: { type: String },
  occurrencesCount: { type: Number },
  userComments: [String],
});

const ErrorModel = mongoose.model("errors", errorModelSchema);

module.exports = ErrorModel;
