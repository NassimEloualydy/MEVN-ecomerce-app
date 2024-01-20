const jwt=require("jsonwebtoken");
const User=require("../models/user");
require("dotenv").config();
exports.protect=async (req,res,next)=>{
    try{
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token=req.headers.authorization.split(' ')[1];
            const decoded=jwt.verify(token,process.env.JWT_SECRETE);
            if(decoded.id){
                req.user =await User.findOne({_id:decoded.id}).select("-photo")
            }
            next();
        }else{
        return res.status(400).json({error:"Not Authroized"});
        }
    }catch(error){
        return res.status(400).json({error:"Not Authroized"});
    }
}