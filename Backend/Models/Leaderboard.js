const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        default: ""
    },
    username: {
        type: String,
        required: true
    },

    displayName: {
        type: String,
        default: ""
    },

    problemsSolved: {
        type: Number,
        default: 0
    },

    ratings: {
        type: Number,
        default: 0
    },
    Badge:{
        type:String,
        default:""
    },

});

module.exports = mongoose.model("Leaderboard", leaderboardSchema);