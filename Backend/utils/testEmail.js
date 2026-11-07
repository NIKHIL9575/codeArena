require("dotenv").config();

const sendEmail = require("./sendEmail");

sendEmail(
  "nk608934@gmail.com",
  "CodeArena Test Email",
  "Hey! Your CodeArena email configuration is working."
)
  .then(() => console.log("Email sent successfully!"))
  .catch((error) => console.log("Email failed:", error.message));