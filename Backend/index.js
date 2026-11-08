require("dotenv").config();
require("dns").setDefaultResultOrder("ipv4first");

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const {Mongodb}=require('./connect');
const authRoutes = require("./Routes/authRoutes");
const profileRoutes = require("./Routes/profileRoutes");
const problemRoutes = require("./Routes/problemRoutes");
const submissionRoutes = require("./Routes/submissionRoutes");
const leaderboardRoutes = require("./Routes/leaderboardRoutes");
const  otherUserRoutes= require("./Routes/otherUserRoutes");
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const cookieParser = require("cookie-parser");


Mongodb(process.env.MONGO_URI).then(()=>console.log("mongodb connected")).catch((er)=>console.log("error occured",er));

app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.use(express.urlencoded({extended:false}));



app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/users",otherUserRoutes);

app.listen(PORT, () => {
  console.log("server is started");
});

