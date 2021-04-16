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

const getOneOccurrenceByHash = async (req, res) => {
  try {
    const result = await OccurrenceModel.findOne({
      hashNumber: req.query.queryData,
    });
    // console.log("response getOne: " + result.language);
    res.send(result._id);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

const getUserActivity = async (req, res) => {
  var result = null;
  var errorObject = {
    errorResults: Array,
    occurrenceId: Array,
  };
  try {
    // result = await ErrorModel.find({
    //   "comments.userId": req.query.queryData,
    // }).aggregate([
    //   {
    //     $lookup: {
    //       from: "occurrences",
    //       let: { hashNumber: "$hashNumber" },
    //       pipeline: [
    //         { $match: { $expr: { $eq: ["$$hashNumber", "$hashNumber"] } } },
    //         { $sort: { _id: -1 } },
    //         { $limit: 1 },
    //       ],
    //       as: "occurrenceDetails",
    //     },
    //   },
    // ]);



    result = await ErrorModel.find({
      "comments.userId": req.query.queryData,
    });
    if (result) {

      
      
      // const test = await result.aggregate([
      //   {
      //     $lookup: {
      //       from: "occurrences",
      //       let: { hashNumber: "$hashNumber" },
      //       pipeline: [
      //         { $match: { $expr: { $eq: ["$$hashNumber", "$hashNumber"] } } },
      //         { $sort: { _id: -1 } },
      //         { $limit: 1 },
      //       ],
      //       as: "occurrenceDetails",
      //     },
      //   },
      // ]);

      // const test = await result.aggregate([
      //   {
      //     $match: {
      //       "comments.userId": req.query.queryData,
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: "occurrences",
      //       let: { hashNumber: "$hashNumber" },
      //       pipeline: [
      //         { $match: { $expr: { $eq: ["$$hashNumber", "$hashNumber"] } } },
      //         { $sort: { _id: -1 } },
      //         { $limit: 1 },
      //       ],
      //       as: "occurrenceDetails",
      //     },
      //   },
      // ]);

      // console.log("TEST: " + test);

      // let itemNames = await test.filter(
      //   (eachObj) => eachObj.comments.userId === 1500
      // );

      // const testTwo = await test.filter(
      //   (eachObj) => eachObj.comments.userId === req.query.queryData
      // );

      // console.log('testTwo: ' + test[0]);
      // const testTwo = await test.find({ "comments.userId": req.query.queryData });

      // errorObject.errorResults = await result;

      // var hash = await errorObject.errorResults;
      // console.log('hash: ' + hash);

      // for (let index = 0; index < hash.length; index++) {
      //   var idResult = await OccurrenceModel.findOne({
      //     hashNumber: hash[index].hashNumber,
      //   });
      //   if(!idResult) {
      //     errorObject.occurrenceId.push(idResult._id);
      //     console.log('idTest: ' + idResult._id);
      //   }
      // }

      // console.log("check error: " + await errorObject.errorResults[0]);
      // console.log("check id: " + await errorObject.occurrenceId[0]);

      res.send(result);
    } else {
      console.log("no results");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const getUserActivity = async (req, res) => {
//   console.log("Inside getUserActivity: " + req.query.queryData);
//   try {
//     const result = await ErrorModel.find({
//       userName: req.query.queryData,
//     });
//     if (result) {
//       res.send(result);
//     } else {
//       res.send("No comments found");
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const postUser = async (req, res) => {
  const newUser = await new UserModel(req.body);
  await newUser.save();
};

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
    // console.log(result.comments.userId);
    res.send(result.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

module.exports = {
  getMonitorError,
  getOccurrencesByHash,
  getOneOccurrenceByHash,
  getOccurrencesById,
  getMessageByOccurrenceHash,
  getHashCount,
  getErrorList,
  getUserCheck,
  getUserActivity,
  // getParamsPage,
  postUser,
  getUserById,
  postMonitorError,
  postErrorHash,
  deleteMonitorError,
  getUserComments,
  postUserComment,
};
