const OccurrenceModel = require("../models/occurrenceModel");
const ErrorModel = require("../models/errorModel");

const crypto = require("crypto");

const getMonitorError = async (req, res) => {
  try {
    const result = await OccurrenceModel.find();
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOccurrencesByHash = async (req, res) => {
  try {
    const result = await await OccurrenceModel.find({
      hashNumber: req.query.queryData,
    });
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOccurrencesById = async (req, res) => {
  try {
    const result = await await OccurrenceModel.find({
      _id: req.query.queryData,
    });
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getHashCount = async (req, res) => {
  try {
    const result = await ErrorModel.find();
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getErrorList = async (req, res) => {
  try {
    const test = await ErrorModel.aggregate([
      {
        $lookup: {
          from: "occurrences",
          let: { hashNumber: "$hashNumber" },
          pipeline: [
            { $match: { $expr: { $eq: ["$$hashNumber", "$hashNumber"] } } },
            { $sort: { _id: -1 } },
            { $limit: 1 },
          ],
          as: "occurrenceDetails",
        },
      },
    ]);
    res.send(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const getParamsPage = async (req, res) => {
//   console.log("inside controller time: " + req.query.id);
//   res.render("/" + req.params.id);
// };

const postMonitorError = async (req, res) => {
  const newMessage = await req.body.message;
  const newHashNumber = await crypto
    .createHash("md5")
    .update(newMessage)
    .digest("hex");
  const newBody = await req.body;
  newBody.hashNumber = await newHashNumber;

  const monitor = new Monitor(newBody);
  const result = await OccurrenceModel.save();
};

const postErrorHash = async (req, res) => {
  const newMessage = await req.body.message;
  const newHashNumber = await crypto
    .createHash("md5")
    .update(newMessage)
    .digest("hex");
  const newBody = await req.body;
  newBody.hashNumber = await newHashNumber;
  newBody.occurrencesCount = await 1;
  const newDbDocument = await new ErrorModel(newBody);
  const existingDbDocument = await ErrorModel.find({
    hashNumber: newHashNumber,
  }).exec();
  if (existingDbDocument[0]) {
    existingDbDocument[0].occurrencesCount =
      (await existingDbDocument[0].occurrencesCount) + 1;
    await existingDbDocument[0].save();
  } else {
    const result = await newDbDocument.save();
  }
};

const deleteMonitorError = async (req, res) => {
  const dbId = await req.params.id;
  const indexResult = await OccurrenceModel.findById(
    dbId,
    function (err, docs) {
      if (err) {
        return err;
      } else {
        return docs;
      }
    }
  );
  const hashDbDocument = await ErrorModel.find({
    message: indexResult.message,
  }).exec();
  if (hashDbDocument[0]) {
    if (hashDbDocument[0].occurrencesCount >= 2) {
      hashDbDocument[0].occurrencesCount =
        (await hashDbDocument[0].occurrencesCount) - 1;
      await hashDbDocument[0].save();
    } else {
      const hashId = await hashDbDocument[0]._id;
      ErrorModel.findByIdAndRemove(hashId, function (err, error) {
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
  OccurrenceModel.findByIdAndRemove(monitorErrorId, function (err, error) {
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
  getOccurrencesByHash,
  getOccurrencesById,
  getHashCount,
  getErrorList,
  // getParamsPage,
  postMonitorError,
  postErrorHash,
  deleteMonitorError,
};
