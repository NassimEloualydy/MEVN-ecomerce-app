const express=require("express");
const {submitProduct}=require("../controller/productController");
const Router=express.Router();
const {protect}=require("../middleware/authMiddlewar")
Router.post("/submitProduct",protect,submitProduct)
module.exports=Router;
