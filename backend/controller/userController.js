const formidable=require("formidable");
const joi=require("joi");
const User=require("../models/user");
const fs=require("fs");
const bcryptjs=require("bcryptjs")
exports.signin=async (req,res)=>{
    const form=formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req,async (err,fields,files)=>{
        const {first_name,last_name,phone,sexe,email,password}=fields;
        var u=await User.find().and([{first_name},{last_name}]).select("-photo")
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