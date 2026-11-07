const express = require("express");
const router = express.Router();

const {
    otherUserController
} = require("../Controllers/otherUserController");

router.get("/:userId", otherUserController);

module.exports = router;