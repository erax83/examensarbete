const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monitorModelSchema = new Schema({
    message: { type: String },
    hashNumber: { type: String },
    occurences: { type: Number },
});

const HashModel = mongoose.model("monitorhashes", monitorModelSchema);

module.exports = HashModel;
