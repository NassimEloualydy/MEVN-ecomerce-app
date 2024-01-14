const express=require("express");
const {signin,login}=require("../controller/userController");
const router=express.Router();
router.post("/signin",signin);
router.post("/login",login);
module.exports=router;
