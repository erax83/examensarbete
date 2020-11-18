const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quoteModelSchema = new Schema({
  name: { type: String },
  quote: { type: String },
});

const Quote = mongoose.model('Quote', quoteModelSchema);

module.exports = Quote;