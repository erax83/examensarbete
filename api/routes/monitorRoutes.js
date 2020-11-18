const express = require("express");
const router = express.Router();
const monitorController = require("../controllers/monitorController");

var cors = require("cors");
var corsOptions = {
  origin: "*",
};
router.use(cors(corsOptions));

router.post(
  "/postMonitorError",
  cors(corsOptions),
  monitorController.monitorErrorPost
);

router.get(
  "/getMonitorError",
  cors(corsOptions),
  monitorController.monitorErrorIndex
);

module.exports = router;
