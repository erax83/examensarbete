const express = require("express");
const router = express.Router();
const monitorController = require("../controllers/monitorController");

var cors = require("cors");
var corsOptions = {
  origin: "*",
};
router.use(cors(corsOptions));

router.get("/", cors(corsOptions), monitorController.getMonitorError);

router.get("/message", cors(corsOptions), monitorController.getMonitorMessage);

router.get("/time", cors(corsOptions), monitorController.getMonitorTime);

router.get("/hashCount", cors(corsOptions), monitorController.getHashCount);

router.get("/list", cors(corsOptions), monitorController.getList);

// router.get("/messages/:id", cors(corsOptions), monitorController.getMessages);

router.post("/", cors(corsOptions), monitorController.postMonitorError);

// Hash
router.post("/hash", cors(corsOptions), monitorController.postErrorHash);

router.delete("/:id", cors(corsOptions), monitorController.deleteMonitorError);

module.exports = router;
