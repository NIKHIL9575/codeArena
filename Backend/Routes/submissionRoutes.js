const express = require("express");
const router = express.Router();

const {
    submitCode,
    userSubmissions,
    runCode,
} = require("../Controllers/submissionController");
const myProfileMiddle = require("../middleware/myProfileMiddle");

router.post("/run",myProfileMiddle, runCode);  
router.post("/submit",myProfileMiddle, submitCode);  
router.get("/", myProfileMiddle,userSubmissions);


module.exports = router;