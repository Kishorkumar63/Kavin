const express = require("express");
const router = express.Router();
const Review = require("../models/reviewModel");
const nodemailer = require("nodemailer");

// Handle form submission
router.post("/send-review", async (req, res) => {
  try {
    const { name, message } = req.body;

    // Store data in MongoDB
    const data = await Review.create(req.body);

    // Send email with stored data
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "1bcdb144c76b3f",
        pass: "c3f7f65052027f",
      },
    });
    const mailOptions = {
      from: `${name}`,
      to: "kishorkumar200313@gmail.com",
      subject: "New Message Submission",
      text: `\nName: ${name}\nMessage:${message}\n\nStored Data:\n${JSON.stringify(
        data.toObject(),
        null,
        2
      )}`,
    };
    await transport.sendMail(mailOptions);

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Error sending message" });
  }
});

module.exports = router;
