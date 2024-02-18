const mongoose=require("mongoose")
const {ObjectId}=require("mongoose").Schema;
const productOrderSchema=mongoose.Schema({
    product:{type:ObjectId,ref:"Product",required:true},
    qte:{type:String,required:true},
    priceInQte:{type:String,required:true},    
    order:{type:ObjectId,ref:"Order"},
    user:{type:ObjectId,ref:"User",required:true},
    status:{type:String,required:true}
},{timestamps:true});
module.exports=mongoose.model("productOrder",productOrderSchema);