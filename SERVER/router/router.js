const Email = require("../models/schema");
const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const transporter = require("../nodemailer/transporter");

router.post("/sendemail", async (req, res) => {
  const { to, from, subject, body } = req.body;

  try {
    const email = new Email({ to, from, subject, body });
    await email.save();

    const mailOptions = {
      to,
      from,
      subject,
      text: body,
    };

    await transporter.sendMail(mailOptions);
    res.send("Email sent successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Get all emails
router.get("/dataemail", async (req, res) => {
  try {
    const emails = await Email.find();
    res.json(emails);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Delete email by ID
router.delete("/emails/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const email = await Email.findByIdAndDelete(id);
    if (!email) {
      return res.status(404).send("Email not found");
    }
    res.send("Email deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
