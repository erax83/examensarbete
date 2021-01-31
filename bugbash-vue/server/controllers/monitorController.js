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

const getHashCount = async (req, res) => {
  try {
    const result = await HashModel.find();
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getList = async (req, res) => {
  // console.log("inside getList");

  //2 Works
  // Monitor.aggregate([{ $match: { message: "errorOne is not defined" } }])
  //   .then((orders) => {
  //     orders.forEach((order) => {
  //       console.log(order);
  //     });
  //   })
  //   .catch((err) => {
  //     throw err;
  //   });

  //2.2 Works
  // const test = await Monitor.aggregate([{ $match: { message: "errorOne is not defined" } }]);

  // for await (const doc of test) {
  //   console.log(doc);
  // }

  // 3 works
  // const test = await HashModel.aggregate([
  //   {
  //     $lookup: {
  //       from: "occurrences",
  //       localField: "hashNumber",
  //       foreignField: "hashNumber",
  //       as: "inventory",
  //     },
  //   },
  //   { $limit: 1 },
  // ]);

  // for await (const doc of test) {
  //   console.log(doc);
  // }

  // 3.2 Works best
  // const test = await HashModel.aggregate([
  //   {
  //     $lookup: {
  //       from: "occurrences",
  //       let: { hashNumber: "$hashNumber" },
  //       pipeline: [
  //         { $match: { $expr: { $eq: ["$$hashNumber", "$hashNumber"] } } },
  //         { $sort: { _id: -1 } },
  //         { $limit: 1 },
  //       ],
  //       as: "inventory",
  //     },
  //   },
  // ]);

  // for await (const doc of test) {
  //   console.log(doc);
  // }

  // 3.2 Works best with res
  try {
    const test = await HashModel.aggregate([
      {
        $lookup: {
          from: "occurrences",
          let: { hashNumber: "$hashNumber" },
          pipeline: [
            { $match: { $expr: { $eq: ["$$hashNumber", "$hashNumber"] } } },
            { $sort: { _id: -1 } },
            { $limit: 1 },
          ],
          as: "inventory",
        },
      },
    ]);
    res.send(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const getOccurrencesCount = async (req, res) => {
//   console.log("inside controller! ");
//   try {
//     const currentDocument = await HashModel.find();
//     res.send(currentDocument);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
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
  const result = await monitor.save();
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
  const newDbDocument = await new HashModel(newBody);
  const existingDbDocument = await HashModel.find({
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
    if (hashDbDocument[0].occurrencesCount >= 2) {
      hashDbDocument[0].occurrencesCount =
        (await hashDbDocument[0].occurrencesCount) - 1;
      await hashDbDocument[0].save();
    } else {
      const hashId = await hashDbDocument[0]._id;
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
  getHashCount,
  getList,
  postMonitorError,
  postErrorHash,
  deleteMonitorError,
};
