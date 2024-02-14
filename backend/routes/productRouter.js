const express=require("express");
const {submitProduct,getData,getImage,deleteProduct}=require("../controller/productController");
const Router=express.Router();
const {protect}=require("../middleware/authMiddlewar")
Router.post("/submitProduct",protect,submitProduct)
Router.post("/getData",protect,getData);
Router.get("/getImage/:_id",getImage)
Router.post("/deleteProduct/:_id",protect,deleteProduct)
module.exports=Router;
