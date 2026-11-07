const express = require("express");
const router = express.Router();

const {
    userCreate,
    userCheck,
    userNameCheck,
    verifyEmail,
    resendOtp,
    checkAuth,
    logout,
} = require("../Controllers/authController");

const userCheckMiddle=require("../middleware/userCheckMiddle");
const myProfileMiddle = require("../middleware/myProfileMiddle");

router.post("/signup", userCreate);
router.post("/login",userCheckMiddle, userCheck);
router.get("/checkUsername",userNameCheck)
router.post("/verifyEmail",verifyEmail);
router.post("/resendOtp",resendOtp);
router.get("/checkAuth",myProfileMiddle, checkAuth);
router.post("/logout",logout);

module.exports = router;