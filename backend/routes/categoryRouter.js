const express=require("express")
const {submitcategory,getData,deleteCategory,getCategoryForProduct}=require("../controller/categoryController");
const Router=express.Router();
const {protect}=require("../middleware/authMiddlewar");

Router.post("/submitcategory",protect,submitcategory);
Router.post("/getData/:offset",protect,getData);
Router.post("/deleteCategory/:id",protect,deleteCategory)
Router.post("/getCategoryForProduct",protect,getCategoryForProduct);
module.exports=Router;
