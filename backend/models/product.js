const mongoose=require("mongoose");
const productSchema=mongoose.Schema({
    photo:{data:Buffer,contentType:String},
    photo1:{data:Buffer,contentType:String},
    photo2:{data:Buffer,contentType:String},
    photo3:{data:Buffer,contentType:String},
    name:{type:String,required:true},
    price:{type:String,required:true},
    qte:{type:String,required:true},
    category:{type:String,required:true},
    description:{type:String,required:true},
    rate:{type:String,required:true},
},{timestamps:true})
module.exports=mongoose.model("Product",productSchema)
