const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  to: { type: Array, required: true },
  from: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  date: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Email", emailSchema);
