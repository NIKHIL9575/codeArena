const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    isEmailVerified:{
        type:Boolean,
        default:false
    },

    
});

module.exports = mongoose.model("User", loginSchema,"Login");