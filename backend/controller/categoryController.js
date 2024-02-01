const Category=require("../models/category");
const joi=require("joi");
exports.submitcategory=async (req,res)=>{
    const {_id,name,description}=req.body;

    const schema=new joi.object({
        name:joi.string().required().messages({"string.empty":"The name is required !!","any.required":"The name is required !!"}),
        description:joi.string().required().messages({"string.empty":"The description is required !!","any.required":"The description is required !!"}),
    })
    
    if(_id==""){

        var c=await Category.find({name}).select()
        if(c.length!=0)
        return res.status(400).json({error:"Please the name is required !!"})
         c=await Category.find({description}).select()
        if(c.length!=0)
        return res.status(400).json({error:"Please the description is required !!"})
        
        const {error}=schema.validate({name,description});
        if(error)
        return res.status(400).json({error:error.details[0].message})
        const category=await Category.create({
            name,description
        });
        if(!category)
        return res.status(400).json({error:c})
        return res.json({message:"Category Added With Success !!"});
    }else{
        var c=await Category.find().and([{_id:{$ne:_id}},{name}]).select()
        if(c.length!=0)
        return res.status(400).json({error:"Please the name is required !!"})
         c=await Category.find().and([{_id:{$ne:_id}},{description}]).select()
        if(c.length!=0)
        return res.status(400).json({error:"Please the description is required !!"})
        
        const {error}=schema.validate({name,description});
        if(error)
        return res.status(400).json({error:error.details[0].message})
        const category=await Category.findOneAndUpdate(
        {_id},
            {$set:{

                name,description
            }
        },{new:true});
        if(!category)
        return res.status(400).json({error:c})
        return res.json({message:"Category Updated With Success !!"});
    
    }

} 
exports.getData=async (req,res)=>{
    const {name,description}=req.body;
    const offset=req.params.offset
    const searchQuery={}
    searchQuery.name={$regex:'.*'+name+'.*',$options:'i'};
    searchQuery.description={$regex:'.*'+description+'.*',$options:'i'};
    const data=await Category.find(searchQuery).select().skip(offset).limit(6);
    if(data)
    return res.json({data})
    return res.status(400).json({error:data})

}
exports.deleteCategory=async (req,res)=>{
    const _id=req.params.id;
    const category=await Category.findOneAndDelete({_id})
    if(category)
    return res.json({message:"Deleted with success"});
    return res.status(400).json({error:category})
}

exports.getCategoryForProduct=async (req,res)=>{
    const categories=await Category.find().select()
    if(categories)
    return res.json({categories})
    return res.json({error:categories})
}