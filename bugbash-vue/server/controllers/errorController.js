const OccurrenceModel = require("../models/occurrenceModel");
const ErrorModel = require("../models/errorModel");
const UserModel = require("../models/userModel");

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
    const result = await OccurrenceModel.find({
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

const getUserCheck = async (req, res) => {
  console.log("Inside getUserCheck: " + req.query.queryData);
  try {
    const result = await UserModel.findOne({
      mail: req.query.queryData,
    });
    if(result) {
      res.send(true);
    }
    else {
      res.send(false);
    }
    // res.send(result);
    // console.log('From getUserCheck: ' + result.fullName);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postUser = async (req, res) => {
  const newName = await req.body.fullName;
  const newMail = await req.body.mail;
  console.log('inside postUser: ' + newName);
  console.log('inside postUser: ' + newMail);
  // const newBody = await req.body;
  const newUser = await new UserModel(req.body);
  await newUser.save();
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

const deleteMonitorError = async (req, res) => {
  console.log("inside delete, params test: " + req.params.id);
  await OccurrenceModel.deleteMany({ hashNumber: req.params.id })
    .then(function () {
      console.log("Occurrence data deleted"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });

  await ErrorModel.deleteOne({ hashNumber: req.params.id })
    .then(function () {
      console.log("Error data deleted"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
  await res.send("success");
};

const getUserComments = async (req, res) => {
  console.log("inside get comments controller " + req.query.queryData);
  var hashData = await req.query.queryData;
  // console.log('hashData: ' + hashData);
  // const result = await ErrorModel.find({
  //   hashNumber: hashData,
  // });

  try {
    const result = await ErrorModel.findOne({
      hashNumber: hashData,
    });
    console.log(result.comments.userName);
    console.log(result.comments.userComment);

    res.send(result.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postUserComment = async (req, res) => {
  var commentData = await req.body.params.queryData;
  var hashData = await req.body.params.hashId;
  var nameData = await req.body.params.userName;

  console.log("inside post user comment and params: " + commentData);
  console.log("inside post user comment and params: " + hashData);
  console.log("inside post user comment and params: " + nameData);

  const userAndComment = {
    userName: nameData,
    userComment: commentData,
  };

  const result = await ErrorModel.findOne({
    hashNumber: hashData,
  });
  console.log(result.message);
  result.comments.push(userAndComment);
  await result.save();
};

module.exports = {
  getMonitorError,
  getOccurrencesByHash,
  getOccurrencesById,
  getHashCount,
  getErrorList,
  getUserCheck,
  // getParamsPage,
  postUser,
  postMonitorError,
  postErrorHash,
  deleteMonitorError,
  getUserComments,
  postUserComment,
};
