require("dotenv").config();
const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const errorRouter = require("./routes/errorRouter");

var corsOptions = {
  origin: "*",
};
server.use(cors(corsOptions));

const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => server.listen(3000))
  .catch((err) => console.log(err));

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => {
  console.log("Connected to database!");
  console.log("Server started on port 3000!");
});

server.use(bodyParser.json());
// ?
server.use(express.static("public"));
// Accept form data
server.use(bodyParser.urlencoded({ extended: true }));

server.use(express.json());
server.use(cors());

server.use("/errorRouter", errorRouter);
