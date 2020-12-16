const Monitor = require("../models/monitorModel");

const getMonitorError = async (req, res) => {
  try {
    const result = await Monitor.find();
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const monitorErrorPost = async (req, res) => {
//   const quote = new Monitor(req.body);
//   const result = await quote.save();
//   res.send("ControllerResult: " + result);
// //   res.redirect("/");
// };

const postMonitorError = async (req, res) => {
  const monitor = new Monitor(req.body);
  const result = await monitor.save();
  // res.redirect("/");
};

// const postMonitorError = async (req, res) => {
//   console.log('inside controller');
//   const monitor = new Monitor({
//     message: req.body.message,
//     stack: req.body.stack,
//   });
//   try {
//     const newMonitor = await monitor.save();
//     res.status(201).json(newMonitor);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

module.exports = {
  getMonitorError,
  postMonitorError,
};
