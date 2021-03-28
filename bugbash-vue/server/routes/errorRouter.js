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

router.get("/userCheck", cors(corsOptions), errorController.getUserCheck);

router.post("/user", cors(corsOptions), errorController.postUser);

// router.get("/messages/:id", cors(corsOptions), errorController.getMessages);

// router.get("/:id", cors(corsOptions), errorController.getParamsPage);

router.post("/", cors(corsOptions), errorController.postMonitorError);

// Hash
router.post("/hash", cors(corsOptions), errorController.postErrorHash);

router.delete("/:id", cors(corsOptions), errorController.deleteMonitorError);

router.get(
  "/userComments",
  cors(corsOptions),
  errorController.getUserComments
);

router.post(
  "/userComment",
  cors(corsOptions),
  errorController.postUserComment
);

module.exports = router;
