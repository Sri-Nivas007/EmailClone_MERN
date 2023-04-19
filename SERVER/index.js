const express = require("express");
const MongoDBConnect = require("./connections/mongooseconnect");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./router/router");

dotenv.config();

const port = 8500;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

MongoDBConnect()
  .then((res) => {
    app.listen(port);
    console.log("Connected to Port");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", router);

app.get("/apicheck", (req, res) => {
  res.send("api check");
});
