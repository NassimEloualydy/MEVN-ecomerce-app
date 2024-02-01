const formidable=require("formidable");
const joi=require("joi");
const Product=require("../models/product");
exports.submitProduct=async (req,res)=>{
    const form=new formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req,async (err,fields,files)=>{
        const {name,price,qte,category,description,rate}=fields;
        if(!files.photo || !files.photo1 || !files.photo2 || !files.photo3)
        return res.status(400).json({warning:"All the photos are required !!"})
        const schema=new joi.object({
            name:joi.string().required().messages({"string.empty":"Please the name is required !!","any.required":"Please the name is required !!"}),
            price:joi.string().required().messages({"string.empty":"Please the price is required !!","any.required":"Please the price is required !!"}),
            qte:joi.string().required().messages({"string.empty":"Please the Quantity is required !!","any.required":"Please the Quantity is required !!"}),
            rate:joi.string().required().messages({"string.empty":"Please the Rate is required !!","any.required":"Please the Rate is required !!"}),
            category:joi.string().required().messages({"string.empty":"Please the category is required !!","any.required":"Please the category is required !!"}),
            description:joi.string().required().messages({"string.empty":"Please the description is required !!","any.required":"Please the description is required !!"}),

        })
        const {error}=schema.validate({name,price,qte,category,description,rate})
        var p=await Product.find({name}).select("-photo -photo1 -photo2 -photo3")
        if(p.length!=0)
        return res.status(400).json({warning:"The Name is already exist !!"})
        
        p=await Product.find({description}).select("-photo -photo1 -photo2 -photo3")
        if(p.length!=0)
        return res.status(400).json({warning:"The Description is already exist !!"})
        const pr=await Product.create({
            name,price,qte,rate,
        })        
        if(error)
        return res.status(400).json({warning:error.details[0].message});
    })
}
