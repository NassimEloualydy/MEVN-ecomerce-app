const express=require("express")
const {submitcategory}=require("../controller/categoryController");
const Router=express.Router();
const {protect}=require("../middleware/authMiddlewar");

Router.post("/submitcategory",protect,submitcategory);
module.exports=Router;