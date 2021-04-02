const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const errorModelSchema = new Schema({
  message: { type: String },
  hashNumber: { type: String },
  occurrencesCount: { type: Number },
  comments: [
    {
      userName: { type: String },
      userComment: { type: String },
      userId: { type: Number },
    },
  ],
});

const ErrorModel = mongoose.model("errors", errorModelSchema);

module.exports = ErrorModel;
