const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monitorModelSchema = new Schema({
    message: { type: String },
    hashNumber: { type: String },
    occurrencesCount: { type: Number },
});

const HashModel = mongoose.model("errors", monitorModelSchema);

module.exports = HashModel;
