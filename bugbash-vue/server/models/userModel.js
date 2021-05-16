const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModelSchema = new Schema({
  fullName: { type: String },
  mail: { type: String },
  id: { type: Number },
});

const UserModel = mongoose.model("users", userModelSchema);

module.exports = UserModel;
