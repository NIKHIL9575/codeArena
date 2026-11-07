const mongoose=require("mongoose");
const problems = require("./problems");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  userName: {
    type: String,
    default:"@username not added",
    trim: true,
    minlength: 3,
    maxlength: 24,
    unique: true,
    sparse: true
  },

  displayName: {
    type: String,
    default:"displayName not added",
    trim: true,
    maxlength: 40
  },

  bio: {
    type: String,
    default: "bio not added"
  },

  avatar: {
    type: String,
    default: ""
  },

  college: {
    type: String,
    default: "college not added"
  },

  github: {
    type: String,
    default: "",
    match: [/^$|^https?:\/\/.+/, "Please enter a valid URL"],

  },

  linkedin: {
    type: String,
    match: [/^$|^https?:\/\/.+/, "Please enter a valid URL"],
    default: ""
  },

  skills: {
    type: [String],
    default: ["skills not added"]
  },

  solvedProblems: {
    easy: {
      type: Number,
      default: 0
    },
    medium: {
      type: Number,
      default: 0
    },
    hard: {
      type: Number,
      default: 0
    }
  },

  rank: {
    type: Number,
    default: 0
  },

  rating: {
    type: Number,
    default: 0
  },

  country: {
    type: String,
    default: "country not added"
  },

  location: {
    type: String,
    default: "location not added"
  },

  website: {
    type: String,
    default: "Website not added"
  },

  topicsMastery: [
    {
      topic: {
        type: String,
        required: true
      },
      solved: {
        type: Number,
        default: 0
      },
      total: {
        type: Number,
        default: 0
      }
    }
  ],

 languagesUsed: [
  {
    language: { type: String, required: true },
    count: { type: Number, default: 0 }
  }
],

  activityDates: {
    type: [String],
    default: []
  },

  badge:{
    type:String,
    default:"Newbie"
  },

  joinedAt: {
  type: Date,
  default: Date.now
},



});

module.exports=mongoose.model("Profile",profileSchema,"Profile");