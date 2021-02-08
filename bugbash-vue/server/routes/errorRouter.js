const express = require("express");
const router = express.Router();
const errorController = require("../controllers/errorController");

var cors = require("cors");
var corsOptions = {
  origin: "*",
};
router.use(cors(corsOptions));

router.get("/", cors(corsOptions), errorController.getMonitorError);

router.get(
  "/occurrencesByHash",
  cors(corsOptions),
  errorController.getOccurrencesByHash
);

router.get(
  "/occurrencesById",
  cors(corsOptions),
  errorController.getOccurrencesById);

// router.get("/hashCount", cors(corsOptions), errorController.getHashCount);

router.get("/errorList", cors(corsOptions), errorController.getErrorList);

// router.get("/messages/:id", cors(corsOptions), errorController.getMessages);

router.post("/", cors(corsOptions), errorController.postMonitorError);

// Hash
router.post("/hash", cors(corsOptions), errorController.postErrorHash);

router.delete("/:id", cors(corsOptions), errorController.deleteMonitorError);

module.exports = router;
