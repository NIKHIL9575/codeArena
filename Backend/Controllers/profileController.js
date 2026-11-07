const User=require("../Models/Login");
const Profile=require("../Models/Profile");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");


const editUser=async (req,res)=>{

    try{

        const profile = await Profile.findOne({ userId: req.userId });

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "CodeArena/avatars" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });

            profile.avatar = result.secure_url;
        }

        const allowedFields = [
            "displayName",
            "userName",
            "bio",
            "country",
            "location",
            "college",
            "github",
            "linkedin",
            "website"
        ];

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                profile[field] = req.body[field];
            }
        });

        await profile.save();

        

        return res.status(200).json({
            message: "Profile updated successfully",
            profile
        });






    }catch(error){

    console.error("Edit profile error:", error);

    return res.status(500).json({
        message:"Internal server error",
    })


    }
   

}

const myProfile=async (req,res)=>{
   
    try {

        const userId = req.userId;

        const profile = await Profile.findOne({ userId });

        if(!profile){
            return res.status(404).json({
                message:"user not found"
            })
        }

        return res.status(200).json({
            message:"user found",
            profile
        })

    } catch (error) {
   
        return res.status(500).json({
            message: "Internal server error",
        }); 

    }


}


module.exports={editUser,myProfile};