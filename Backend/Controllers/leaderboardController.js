
const leaderboard=require("../Models/Leaderboard")

const getUsers = async (req, res) => {

    try {

        const result = await leaderboard.find().sort({ ratings: -1 })


        return res.status(200).json({
            result
        })

    } catch (error) {
        console.log("Submit code error:", error);

        return res.status(500).json({
            message: "Submission failed"
        });

    }


}




module.exports={getUsers};