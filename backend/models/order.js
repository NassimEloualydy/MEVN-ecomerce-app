const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema;
const orderSchema=mongoose.Schema({
    user:{type:ObjectId,ref:"User",required:true},
    priceOrder:{type:String,required:true},
    status:{type:String,required:true},
    is_delevered:{type:String,required:true},
    date_delevered:{type:String},
    order:{type:ObjectId,ref:"Order"}
},{timestamps:true})
module.exports=mongoose.model("Order",orderSchema);