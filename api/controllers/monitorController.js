const Monitor = require("../models/monitorModel");

const monitorErrorIndex = async (req, res) => {
  const result = await Monitor.find();
  console.log(result);
  res.send(result);
  res.redirect("/");
};

const monitorErrorPost = async (req, res) => {
  const quote = new Monitor(req.body);
  const result = await quote.save();
  res.redirect("/");
};

module.exports = {
  monitorErrorIndex,
  monitorErrorPost,
};
