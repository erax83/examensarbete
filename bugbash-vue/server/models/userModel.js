const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModelSchema = new Schema({
  fullName: { type: String },
  mail: { type: String },
  occurrencesCount: { type: Number },
  comments: [
    {   
      occurrence: { type: String },
      userComment: { type: String },
    },
  ],
});

const UserModel = mongoose.model("users", userModelSchema);

module.exports = UserModel;
