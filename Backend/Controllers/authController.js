
const User = require("../Models/Login");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const pendingSignup = require("../Models/pendingSignup");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
const Profile = require("../Models/Profile");
const Problem = require("../Models/problems");
const topic=require("../Data/topics.json")


const userCreate = async (req, res) => {
    try {
        const { displayName, email, password } = req.body;

        // 1. Check whether the user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { displayName }],
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email or display name already exists",
            });
        }

        // 2. Check whether a pending signup already exists
        const existingPending = await pendingSignup.findOne({
            $or: [{ email }, { displayName }],
        });

        // 3. If a pending signup exists, verify its email and display name
        if (
            existingPending &&
            (existingPending.email !== email ||
                existingPending.displayName !== displayName)
        ) {
            return res.status(409).json({
                message: "Email or display name is already in use",
            });
        }

        // 4. Generate a new OTP
        const otp = crypto.randomInt(100000, 1000000).toString();

        

        // 5. Hash the OTP and password
        const hashedOTP = await bcrypt.hash(otp, 10);
        const hashedPassword = await bcrypt.hash(password, 10);

        // 6. Update the existing pending signup or create a new one
        if (existingPending) {
            // Update existing pending signup
            existingPending.otp = hashedOTP;
            existingPending.password = hashedPassword;
            existingPending.expiresAt = new Date(
                Date.now() + 5 * 60 * 1000
            );

            await existingPending.save();
        } else {
            // Create a new pending signup
            await pendingSignup.create({
                displayName,
                email,
                password: hashedPassword,
                otp: hashedOTP,
                expiresAt: new Date(Date.now() + 5 * 60 * 1000),
            });
        }

        // 7. Send the OTP in both cases
        await sendEmail(
            email,
            "Your CodeArena verification code",
            `Your OTP is ${otp}. It expires in 5 minutes.`
        );

        // 8. Respond to the frontend
        return res.status(existingPending ? 200 : 201).json({
            message: existingPending
                ? "A new verification code has been sent to your email"
                : "Verification code sent to your email",
        });

    } catch (error) {
        console.error("Signup error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const userCheck = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "User does not exist"
            });
        }

        if (!user.isEmailVerified) {
            return res.status(403).json({
                message: "Please verify your email before logging in"
            });
        }
        const passWord = await bcrypt.compare(password, user.password);
        
        if (passWord) {

      
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 1000,
            });

        


            return res.status(200).json({
                message: "Login Successful",
                profile: {
                    id: user._id,
                    displayName: user.displayName
                }
            })
        } else {
            return res.status(401).json({
                message: "invalid email or password"
            })
        }


    } catch (error) {
        console.log("error:",error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }

}

const userNameCheck = async (req, res) => {
    try {

        const { displayName } = req.query;
        if (displayName) {
            const name = await User.findOne({ displayName });
            if (name) {
                return res.json({
                    message: "Display name is not available"
                })
            } else {
                return res.json({
                    message: "Display name is available"
                })
            }
        } else {
            return res.status(400).json({
                message: "Display name is required"
            });
        }


    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const verifyEmail =async (req,res) =>{
   try {
    // Step 1: Get email and OTP
    const { email, otp } = req.body;

    // Step 2: Find pending signup
    const pendingUser = await pendingSignup.findOne({ email });

    if (!pendingUser) {
      return res.status(404).json({
        message: "No pending signup found. Please sign up again.",
      });
    }

    // Step 3: Check OTP expiry
    if (pendingUser.expiresAt < new Date()) {
      return res.status(400).json({
        message: "OTP has expired. Please request a new one.",
      });
    }

    // Step 4: Verify OTP
    const isOTPValid = await bcrypt.compare(
      otp,
      pendingUser.otp
    );

    if (!isOTPValid) {
      return res.status(400).json({
        message: "Invalid OTP.",
      });
    }

    // Step 5: Create permanent user
    const newUser = await User.create({
      displayName: pendingUser.displayName,
      email: pendingUser.email,
      password: pendingUser.password,
      isEmailVerified: true,
    });

   

      // Calculate topic mastery for the new profile
       const topicsMastery = await Promise.all(
           topic.map(async (topic) => {
               const total = await Problem.countDocuments({
                   topic: topic
               });

               return {
                   topic: topic,
                   solved: 0,
                   total: total
               };
           })
       );


       await Profile.create({
           userId: newUser._id,
           displayName: newUser.displayName,
           topicsMastery: topicsMastery,
           languagesUsed: [],
           activityDates: []
       });


       const token = jwt.sign(
           { userId: newUser._id },
           process.env.JWT_SECRET,
           { expiresIn: "15m" }
       );

       res.cookie("token", token, {
           httpOnly: true,
           secure: process.env.NODE_ENV === "production",
           sameSite: "lax",
           maxAge: 15 * 60 * 1000,
       });


    // Step 6: Delete pending signup
    await pendingSignup.deleteOne({
      _id: pendingUser._id,
    });

    // Step 7: Send response
    return res.status(201).json({
      message: "Email verified and account created successfully!",
      user: {
        id:newUser._id,
        displayName: newUser.displayName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Email verification error:", error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}

const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        // 1. Find the pending signup
        const pending = await pendingSignup.findOne({ email });

        if (!pending) {
            return res.status(404).json({
                message: "No pending signup found. Please sign up again.",
            });
        }

        // 2. Generate a new OTP
        const otp = crypto.randomInt(100000, 1000000).toString();

        // 3. Hash the OTP
        const hashedOTP = await bcrypt.hash(otp, 10);

        // 4. Update OTP and expiry
        pending.otp = hashedOTP;
        pending.expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        await pending.save();

        // 5. Send the OTP email
        await sendEmail(
            email,
            "Your CodeArena verification code",
            `Your new OTP is ${otp}. It expires in 5 minutes.`
        );

        // 6. Respond to frontend
        return res.status(200).json({
            message: "A new verification code has been sent to your email.",
        });

    } catch (error) {
        console.error("Resend OTP error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};


const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("displayName");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      isLoggedIn: true,
      displayName: user.displayName,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



module.exports={userCheck,userCreate,userNameCheck,verifyEmail,resendOtp,checkAuth,logout};