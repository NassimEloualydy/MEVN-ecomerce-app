const express=require("express")
const {submitcategory,getData,deleteCategory}=require("../controller/categoryController");
const Router=express.Router();
const {protect}=require("../middleware/authMiddlewar");

Router.post("/submitcategory",protect,submitcategory);
Router.post("/getData",protect,getData);
Router.post("/deleteCategory/:id",protect,deleteCategory)
module.exports=Router;
