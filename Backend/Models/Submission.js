const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
        required: true
    },

    title: {
        type: String,
        required: true
    },


    language: {
        type: String,
        required: true
    },

    code: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Pending"
    },

    executionTime: {
        type: Number,
        default: null
    },

    memoryUsed: {
        type: Number,
        default: null
    },

    passedTestCases: {
        type: Number,
        default: 0
    },

    totalTestCases: {
        type: Number,
        default: 0
    },

    submittedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model("Submission", submissionSchema);