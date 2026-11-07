const profile=require("../Models/Profile");

const otherUserController = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await profile.findOne({ userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      profile: user
    });

  } catch (error) {

    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

 module.exports={otherUserController};