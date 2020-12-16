const express = require("express");
const router = express.Router();
const characterController = require("../controllers/characterController");

var cors = require("cors");
var corsOptions = {
  origin: "*",
};
router.use(cors(corsOptions));

router.get("/", cors(corsOptions), characterController.getCharacters);

router.post("/", cors(corsOptions), characterController.postCharacter);

module.exports = router;
