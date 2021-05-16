const express = require("express");
const router = express.Router();
const errorController = require("../controllers/errorController");

var cors = require("cors");
var corsOptions = {
  origin: "*",
};
router.use(cors(corsOptions));
router.get("/", cors(corsOptions), errorController.getMonitorError);
router.get("/errorList", cors(corsOptions), errorController.getErrorList);
router.get(
  "/occurrencesByHash",
  cors(corsOptions),
  errorController.getOccurrencesByHash
);
router.get(
  "/occurrenceByHash",
  cors(corsOptions),
  errorController.getOneOccurrenceByHash
);
router.get(
  "/messageByOccurrenceHash",
  cors(corsOptions),
  errorController.getMessageByOccurrenceHash
);
router.get(
  "/occurrencesById",
  cors(corsOptions),
  errorController.getOccurrencesById
);
router.get("/userCheck", cors(corsOptions), errorController.getUserCheck);
router.get("/userActivity", cors(corsOptions), errorController.getUserActivity);
router.get("/userById", cors(corsOptions), errorController.getUserById);
router.get("/userComments", cors(corsOptions), errorController.getUserComments);
router.post("/user", cors(corsOptions), errorController.postUser);
router.post("/", cors(corsOptions), errorController.postMonitorError);
router.post("/hash", cors(corsOptions), errorController.postErrorHash);
router.post("/userComment", cors(corsOptions), errorController.postUserComment);
router.delete("/:id", cors(corsOptions), errorController.deleteMonitorError);

module.exports = router;
