const OccurrenceModel = require("../models/occurrenceModel");
const ErrorModel = require("../models/errorModel");
const UserModel = require("../models/userModel");

const crypto = require("crypto");

/**
 * Gets all documents from errors-collection from the database and the latest
 * corresponding occurrence. These are displayed in the opening page.
 * @param {*} req
 * @param {*} res
 */
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

const getMonitorError = async (req, res) => {
  try {
    const result = await OccurrenceModel.find();
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Returns all occurrences by hashnumber. 
 * @param {*} req 
 * @param {*} res 
 */
const getOccurrencesByHash = async (req, res) => {
  try {
    const result = await OccurrenceModel.find({
      hashNumber: req.query.queryData,
    });
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Gets latest occurrence of an error by hashnumber.
 * @param {*} req
 * @param {*} res
 */
const getOneOccurrenceByHash = async (req, res) => {
  try {
    const result = await OccurrenceModel.findOne({
      hashNumber: req.query.queryData,
    });
    console.log("res: " + result._id);
    res.send(result._id);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Gets all occurreces of the same errortype. These can be switched between in detailpage.
 * @param {*} req
 * @param {*} res
 */
const getOccurrencesById = async (req, res) => {
  try {
    const result = await OccurrenceModel.find({
      _id: req.query.queryData,
    });
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
/**
 * Gets message based on occurrence hashnumber.
 * @param {*} req
 * @param {*} res
 */
const getMessageByOccurrenceHash = async (req, res) => {
  try {
    const result = await ErrorModel.findOne({
      hashNumber: req.query.queryData,
    });
    res.send(result.message);
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

const getUserCheck = async (req, res) => {
  try {
    const result = await UserModel.findOne({
      mail: req.query.queryData,
    });
    if (result) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
/**
 * Gets errors based on if it includes comments from a choosen user.
 * 
 * @param {*} req
 * @param {*} res
 */
const getUserActivity = async (req, res) => {
  var result = null;
  try {
    result = await ErrorModel.find({
      "comments.userId": req.query.queryData,
    });
    if (result) {
      res.send(result);
    } else {
      console.log("no results");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Gets user by id in userpage.
 * @param {*} req
 * @param {*} res
 */
const getUserById = async (req, res) => {
  try {
    const result = await UserModel.findOne({
      id: req.query.queryData,
    });
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Gets usercomment related to errortype currently viewed.
 * @param {*} req
 * @param {*} res
 */
const getUserComments = async (req, res) => {
  var hashData = await req.query.queryData;
  try {
    const result = await ErrorModel.findOne({
      hashNumber: hashData,
    });
    res.send(result.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
/**
 * Post new user.
 * @param {*} req 
 * @param {*} res 
 */
const postUser = async (req, res) => {
  const newUser = await new UserModel(req.body);
  await newUser.save();
};

const postMonitorError = async (req, res) => {
  const newMessage = await req.body.message;
  const newHashNumber = await crypto
    .createHash("md5")
    .update(newMessage)
    .digest("hex");
  const newBody = await req.body;
  newBody.hashNumber = await newHashNumber;
  const monitor = await new OccurrenceModel(newBody);
  await monitor.save();
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
/**
 * Posts new comment. The document is saved in the errors-collection.
 * @param {*} req
 * @param {*} res
 */
const postUserComment = async (req, res) => {
  var commentData = await req.body.params.queryData;
  var hashData = await req.body.params.hashId;
  var nameData = await req.body.params.userName;
  var idData = await req.body.params.userId;

  const userAndComment = {
    userName: nameData,
    userComment: commentData,
    userId: idData,
  };

  const result = await ErrorModel.findOne({
    hashNumber: hashData,
  });
  console.log(result.message);
  result.comments.push(userAndComment);
  await result.save();
};

/**
 * Deletes one error and all related occurrences.
 * @param {*} req
 * @param {*} res
 */
const deleteMonitorError = async (req, res) => {
  await OccurrenceModel.deleteMany({ hashNumber: req.params.id })
    .then(function () {
      console.log("Occurrence data deleted");
    })
    .catch(function (error) {
      console.log(error);
    });

  await ErrorModel.deleteOne({ hashNumber: req.params.id })
    .then(function () {
      console.log("Error data deleted");
    })
    .catch(function (error) {
      console.log(error);
    });
  await res.send("success");
};

module.exports = {
  getErrorList,
  getMonitorError,
  getOccurrencesByHash,
  getOneOccurrenceByHash,
  getOccurrencesById,
  getMessageByOccurrenceHash,
  getHashCount,
  getUserCheck,
  getUserActivity,
  postUser,
  getUserById,
  postMonitorError,
  postErrorHash,
  getUserComments,
  postUserComment,
  deleteMonitorError,
};
