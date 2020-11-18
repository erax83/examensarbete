const Quote = require("../models/quoteModel");

const quoteIndex = async (req, res) => {
  const result = await Quote.find();
  console.log(result);
  res.send(result);
  res.redirect("/");
};

const quotePost = async (req, res) => {
  const quote = new Quote(req.body);
  const result = await quote.save();
  res.redirect("/");
};

module.exports = {
  quoteIndex,
  quotePost,
};
