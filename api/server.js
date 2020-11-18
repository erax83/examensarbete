const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
var cors = require("cors");
const quoteRoutes = require("./routes/quoteRoutes");
const monitorRoutes = require("./routes/monitorRoutes");

var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

// Mongo database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => app.listen(4000))
  .catch((err) => console.log(err));

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("MongoDB Connected...");
  console.log("Listening on port 4000");
});

// const quotesCollection = db.collection("quotes");
// const errorCollection = db.collection("errorPosts");

app.use(bodyParser.json());
// ?
app.use(express.static("public"));
// Accept form data
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// // Quotes
app.use(quoteRoutes);
app.use(monitorRoutes);
