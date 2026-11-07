const express = require("express");
const router = express.Router();

const { getUsers } = require("../Controllers/leaderboardController");

router.get("/", getUsers);

module.exports = router;