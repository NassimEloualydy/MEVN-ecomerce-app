const express=require("express");
const router=express.Router();
const {protect}=require("../middleware/authMiddlewar");
const {saveProductOrder,getData,getProductChoosen,confirmOrder}=require("../controller/orderController");
router.post("/saveProductOrder",protect,saveProductOrder);
router.post("/getProductChoosen",protect,getProductChoosen);
router.post("/confirmOrder/:priceTotale",protect,confirmOrder);
router.post("/getData",protect,getData);
module.exports=router;
