const {GenerateClientToken,checkout}=require("../controller/braintreeController")
const express=require("express")
const router=express.Router()

router.get("/GenerateClientToken",GenerateClientToken);
router.post("/checkout",checkout);
module.exports=router;