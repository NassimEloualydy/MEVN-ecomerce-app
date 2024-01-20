const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
require("dotenv").config()

const app=express()
const PORT=process.env.PORT || 8080

const userRouter=require("./routes/userRouter");
const categoryRouter=require("./routes/categoryRouter");
app.use(cors());
app.use(express.json())
app.use("/API/user",userRouter);
app.use("/API/category",categoryRouter);

const DATABASE=process.env.DATABASE;

mongoose.connect(DATABASE).then(()=>{
    console.log("Connected")
}).catch((err)=>{console.log(err)})
app.listen(PORT,()=>{
    console.log(`app runing on port ${PORT}`)
})
