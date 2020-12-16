const express = require("express");
const router = express.Router();
const monitorController = require("../controllers/monitorController");

var cors = require("cors");
var corsOptions = {
  origin: "*",
};
router.use(cors(corsOptions));

router.get("/", cors(corsOptions), monitorController.getMonitorError);

router.post("/", cors(corsOptions), monitorController.postMonitorError);

module.exports = router;
