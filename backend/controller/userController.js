const formidable=require("formidable");
const joi=require("joi");
const User=require("../models/user");
const fs=require("fs");
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken");
require("dotenv").config();
exports.login=async (req,res)=>{
    const {email,password}=req.body;
    var u=await User.find({email}).select("-photo");
    if(u.length==0)
    return res.status(400).json({error:"The email is not found !!"})
    u=await User.findOne({email}).select("-photo");
    if(await u.matchPassword(password)){
            
            const token=jwt.sign({id:u._id},process.env.JWT_SECRETE,{expiresIn:'30d'});
            user_connected=await User.findOneAndUpdate(
                {_id:u.id},
                {$set:{token,status:"Connected"}},
                {new:true}
            )
            return res.json({first_name:u.first_name,last_name:u.last_name,role:u.role,token})
    }else{
        return res.status(400).json({error:"The password does not match the email !!"});
    }

}
exports.signin=async (req,res)=>{
    const form=formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req,async (err,fields,files)=>{
        const {first_name,last_name,phone,sexe,email,password}=fields;
        var u=await User.find().and([{first_name},{last_name}]).select("-photo")
        const schema=new joi.object({
            first_name:joi.string().required().messages({"string.emtpy":"Please the first name is required !!","any.required":"Please the first name is required !!"}),
            last_name:joi.string().required().messages({"string.emtpy":"Please the last name is required !!","any.required":"Please the last name is required !!"}),
            phone:joi.string().required().messages({"string.emtpy":"Please the Phone is required !!","any.required":"Please the Phone is required !!"}),
            sexe:joi.string().required().messages({"string.emtpy":"Please the Sexe is required !!","any.required":"Please the Sexe is required !!"}),
            email:joi.string().required().messages({"string.emtpy":"Please the Email is required !!","any.required":"Please the Email is required !!"}),
            password:joi.string().required().messages({"string.emtpy":"Please the Password is required !!","any.required":"Please the Password is required !!"}),
        })
        const {error}=schema.validate({first_name,last_name,phone,sexe,email,password})
        if(error){
            return res.status(400).json({error:error.details[0].message});
        }
        if(u.length!=0)
        return res.status(400).json({error:"Please the first name and the last name is already exist !!"});

        u=await User.find({phone}).select("-photo")
        if(u.length!=0)
        return res.status(400).json({error:"Please the phone is already exist !!"});

        u=await User.find({email}).select("-photo")
        if(u.length!=0)
        return res.status(400).json({error:"Please the email is already exist !!"});
        const salt=await bcryptjs.genSalt(10);
        password_new=await bcryptjs.hash(password,salt);

        const user=await User.create({
            first_name,last_name,email,password:password_new,phone,sexe,status:"Disconnected",role:"User",
            photo:{data:fs.readFileSync(files.photo.path),contentType:files.photo.type}
        })
        if(!user)
        return res.status(400).json({error:"Somthing went wrong"})
        return res.json({message:"Sign In With Success"});
    })
}