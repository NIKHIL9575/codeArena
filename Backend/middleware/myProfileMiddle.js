
 const jwt = require("jsonwebtoken");

const myProfileMiddle=async (req,res,next)=>{

  try{
  
    const token=req.cookies.token;
    
    
    if(!token){
        return res.status(401).json({
            message:"pls log in first"
        })
    }

    const verify=jwt.verify(token,process.env.JWT_SECRET);

    req.userId=verify.userId;

    next();


  }catch(error){
   console.log("JWT error:", error.message);
      return res.status(401).json({
        message:"Invalid or expired token"
      })
  }

}

module.exports=myProfileMiddle;