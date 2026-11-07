
 
 const userCheckMiddle=async(req,res,next)=>{

  const {email,password}=req.body

     if (!email || !password) {
         return response.status(401).json({
             message: "email and password both required"
         });
     }

     if (
         typeof email !== "string" ||
         typeof password !== "string"
     ) {
         return res.status(400).json({
             message: "Invalid input",
         });
     }

     req.user={email,password};

     next();


 }

 module.exports=userCheckMiddle;