const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/gmailclone";

module.exports = () => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.log("Error Connecting to MongoDB");
      throw new Error(err);
    });
};
