const mongoose=require("mongoose")
const categoryScehma=mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
},{
    timestamps:true
});
module.exports=mongoose.model("Category",categoryScehma);