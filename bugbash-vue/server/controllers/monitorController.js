const Monitor = require("../models/monitorModel");
const HashModel = require("../models/hashModel");
const crypto = require("crypto");

const getMonitorError = async (req, res) => {
  try {
    const result = await Monitor.find();
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postMonitorError = async (req, res) => {
  const monitor = new Monitor(req.body);
  const result = await monitor.save();
};

const postErrorHash = async (req, res) => {
  const newMessage = await req.body.message;
  const newHashNumber = await crypto.createHash("md5").update(newMessage).digest("hex");
  let newBody = await req.body;
  newBody.hashNumber = await newHashNumber;
  const monitor = await new HashModel(newBody);
  const result = await monitor.save();
};

const deleteMonitorError = async (req, res) => {
  var id = req.params.id;
  Monitor.findByIdAndRemove(id, function (err, error) {
    if (err) {
      return res.status(500).json({
        message: "Error getting record.",
      });
    }
    return res.json(error);
  });
};

module.exports = {
  getMonitorError,
  postMonitorError,
  postErrorHash,
  deleteMonitorError,
};
