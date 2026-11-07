const express = require("express");
const router = express.Router();
const upload=require("../config/multer");

const {
    editUser,
    myProfile
} = require("../Controllers/profileController");

const myProfileMiddle=require("../middleware/myProfileMiddle");

router.get("/",myProfileMiddle, myProfile);
router.patch("/edit",myProfileMiddle,upload.single("avatar"), editUser);


module.exports = router;