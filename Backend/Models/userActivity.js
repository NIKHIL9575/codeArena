const mongoose = require("mongoose");

const userActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  loginDates: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("UserActivity", userActivitySchema);