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
  const newHashNumber = await crypto
    .createHash("md5")
    .update(newMessage)
    .digest("hex");
  let newBody = await req.body;
  newBody.hashNumber = await newHashNumber;
  newBody.occurences = await 1;
  const newDbDocument = await new HashModel(newBody);
  const existingDbDocument = await HashModel.find({
    hashNumber: newHashNumber,
  }).exec();
  if (existingDbDocument[0]) {
    existingDbDocument[0].occurences =
      (await existingDbDocument[0].occurences) + 1;
    await existingDbDocument[0].save();
  } else {
    const result = await newDbDocument.save();
  }
};

const deleteMonitorError = async (req, res) => {
  var dbId = await req.params.id;
  const indexResult = await Monitor.findById(dbId, function (err, docs) {
    if (err) {
      return err;
    } else {
      return docs;
    }
  });

  const hashDbDocument = await HashModel.find({
    message: indexResult.message,
  }).exec();
  if (hashDbDocument[0]) {
    if (hashDbDocument[0].occurences >= 2) {
      hashDbDocument[0].occurences = (await hashDbDocument[0].occurences) - 1;
      await hashDbDocument[0].save();
    } else {
      var hashId = await hashDbDocument[0]._id;
      HashModel.findByIdAndRemove(hashId, function (err, error) {
        if (err) {
          return res.status(500).json({
            message: "Error getting record.",
          });
        }
        return res.json(error);
      });
    }
  }

  const monitorErrorId = await req.params.id;
  Monitor.findByIdAndRemove(monitorErrorId, function (err, error) {
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
