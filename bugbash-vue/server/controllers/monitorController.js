const Monitor = require("../models/monitorModel");

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
  deleteMonitorError,
};
