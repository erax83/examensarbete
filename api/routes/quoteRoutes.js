const express = require("express");
const router = express.Router();
const quoteController = require('../controllers/quoteController');

router.post("/quotes", quoteController.quotePost);

router.get("/getQuotes", quoteController.quoteIndex);

module.exports = router;
