const formidable=require("formidable");
const joi=require("joi");
const Product=require("../models/product");
const fs=require("fs");
exports.submitProduct=async (req,res)=>{

    const form=new formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req,async (err,fields,files)=>{
        const {name,price,qte,category,description,rate,_id}=fields;
        if(_id==""){
            if(!files.photo || !files.photo1 || !files.photo2 || !files.photo3)
            return res.status(400).json({warning:"All the photos are required !!"})
        }
        
        const schema=new joi.object({
            name:joi.string().required().messages({"string.empty":"Please the name is required !!","any.required":"Please the name is required !!"}),
            price:joi.string().required().messages({"string.empty":"Please the price is required !!","any.required":"Please the price is required !!"}),
            qte:joi.string().required().messages({"string.empty":"Please the Quantity is required !!","any.required":"Please the Quantity is required !!"}),
            rate:joi.string().required().messages({"string.empty":"Please the Rate is required !!","any.required":"Please the Rate is required !!"}),
            category:joi.string().required().messages({"string.empty":"Please the category is required !!","any.required":"Please the category is required !!"}),
            description:joi.string().required().messages({"string.empty":"Please the description is required !!","any.required":"Please the description is required !!"}),

        })
        
        const {error}=schema.validate({name,price,qte,category,description,rate})
        if(_id==""){
            //Create 
            var p=await Product.find({name}).select("-photo -photo1 -photo2 -photo3")
            if(p.length!=0)
            return res.status(400).json({warning:"The Name is already exist !!"})
            
            p=await Product.find({description}).select("-photo -photo1 -photo2 -photo3")
            if(p.length!=0)
            return res.status(400).json({warning:"The Description is already exist !!"})
            if(error)
            return res.status(400).json({warning:error.details[0].message});
            const pr=await Product.create({
                name,price,qte,rate,category,
    description,
                photo:{data:fs.readFileSync(files.photo.path),contentType:files.photo.type},
                photo1:{data:fs.readFileSync(files.photo1.path),contentType:files.photo.type},
                photo2:{data:fs.readFileSync(files.photo2.path),contentType:files.photo.type},
                photo3:{data:fs.readFileSync(files.photo3.path),contentType:files.photo.type},
            })
            if(pr)
            return res.json({message:"Added With Success"})
            return res.status(400).json({error:pr});
               
        }else{
            //update
            var p=await Product.find().select("-photo -photo1 -photo2 -photo3").and([{_id:{$ne:_id}},{name}])
            if(p.length!=0)
            return res.status(400).json({warning:"The Name is already exist !!"})
            
            p=await Product.find().select("-photo -photo1 -photo2 -photo3").and([{_id:{$ne:_id}},{description}])
            if(p.length!=0)
            return res.status(400).json({warning:"The Description is already exist !!"})
            if(error)
            return res.status(400).json({warning:error.details[0].message});
            var pr=await Product.findOneAndUpdate(
                {_id},{$set:{
                name,price,qte,rate,category,
    description,
            }},{new:true})
            if(files.photo){
                pr=await Product.findOneAndUpdate(
                    {_id},{$set:{
                        photo:{data:fs.readFileSync(files.photo.path),contenType:files.photo.type}
                }},{new:true})
            }
            if(files.photo1){
                pr=await Product.findOneAndUpdate(
                    {_id},{$set:{
                        photo1:{data:fs.readFileSync(files.photo1.path),contenType:files.photo.type}
                }},{new:true})
            }
            if(files.photo2){
                pr=await Product.findOneAndUpdate(
                    {_id},{$set:{
                        photo2:{data:fs.readFileSync(files.photo2.path),contenType:files.photo.type}
                }},{new:true})
            }
            if(files.photo3){
                pr=await Product.findOneAndUpdate(
                    {_id},{$set:{
                        photo3:{data:fs.readFileSync(files.photo3.path),contenType:files.photo.type}
                }},{new:true})
            }


            if(pr)
            return res.json({message:"Updated With Success"})
            return res.status(400).json({error:pr});
    
        }


    })
}
exports.getData=async (req,res)=>{
    const {name,price,qte,rate,category,description}=req.body;
    const searchQuery={}
    searchQuery.price={$regex:'.*'+price+'.*',$options:'i'};
    searchQuery.qte={$regex:'.*'+qte+'.*',$options:'i'};
    searchQuery.rate={$regex:'.*'+rate+'.*',$options:'i'};
    searchQuery.name={$regex:'.*'+name+'.*',$options:'i'};
    searchQuery.description={$regex:'.*'+description+'.*',$options:'i'};
    const data=await Product.find(searchQuery).select("-photo -photo1 -photo2 -photo3").populate(
        [
            {
                path:"category",
                model:"Category",
                match:{
                    name:{$regex:'.*'+category+'.*',$options:'i'}
                }
            }
        ]
    ) 
    if(data)
    return res.json({data})
    return res.status(400).json({error:data});   
}
exports.getImage=async (req,res)=>{
    const _id=req.params._id
    const p=await Product.findOne({_id})
    const {data,contenType}=p.photo;
    res.set("contentType",contenType);
    return res.send(data);
}
exports.deleteProduct=async (req,res)=>{
    const _id=req.params._id
    const p=await Product.findOneAndDelete({_id})
    if(p)
    return res.json({message:"Product Deleted With Success"})     
    return res.status(400).json({err:p})

}