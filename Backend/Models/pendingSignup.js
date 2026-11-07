const mongoose = require("mongoose");

const pendingSignupSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true, // Store the hashed password
  },
  otp: {
    type: String,
    required: true, // Store the hashed OTP
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("PendingSignup", pendingSignupSchema);