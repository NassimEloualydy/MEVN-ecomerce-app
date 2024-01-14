const express=require("express");
const {signin}=require("../controller/userController");
const router=express.Router();
router.post("/signin",signin);
module.exports=router;