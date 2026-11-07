const express = require("express");
const router = express.Router();
const checkAuth=require("../Auth/problemAuth")

const {
    getProblems,
    currentProblem
} = require("../Controllers/problemController");


router.get("/", getProblems);
router.get("/:id", currentProblem);

module.exports = router;