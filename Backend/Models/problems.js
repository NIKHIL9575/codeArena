const mongoose = require("mongoose");
const {Mongodb}=require('../connect');


const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    difficulty: {
        type: String,
        enum: ["EASY", "MEDIUM", "HARD"],
        required: true
    },

    topics: {
        type: [String],
        default: []
    },

    testCases: [
        {
            input: mongoose.Schema.Types.Mixed,
            expectedOutput: mongoose.Schema.Types.Mixed,
            explanation:String,
            stdin:String
        }
    ],

    // Kept server-side so the backend can append the correct driver before
    // submitting student code to Judge0.
    wrapperCode: {
        c: { type: String, default: "" },
        cpp: { type: String, default: "" },
        java: { type: String, default: "" },
        javascript: { type: String, default: "" },
        python: { type: String, default: "" }
    },

    // Submission-only cases must stay out of public problem responses.
    hiddenTestCases: [
        {
            input: mongoose.Schema.Types.Mixed,
            expectedOutput: mongoose.Schema.Types.Mixed,
            stdin:String
        }
    ],

    starterCode: {
    c: {
        type: String,
        default: ""
    },
    cpp: {
        type: String,
        default: ""
    },
    java: {
        type: String,
        default: ""
    },
    javascript: {
        type: String,
        default: ""
    },
    python: {
        type: String,
        default: ""
    }
},

    solutions: {
        type: String,
        default: ""
    },

    timeLimit: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    },

    memoryLimit: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    },

    source: {
        type: String,
        default: ""
    },

    url: {
        type: String,
        default: ""
    },
    hints:{
        type:[String],
        default:[]
    },
    task:{
        type:String,
        default:""
    },
    timeComplexity:{
        type:String,
        default:""
    },
    spaceComplexity:{
        type:String,
        default:""
    },

    constraints:{
        type:String,
        default:""
    },

});

module.exports = mongoose.model("Problem", problemSchema,"problems");


   
  


