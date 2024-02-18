const productOrder=require("../models/productOrder");
const Order=require("../models/order");
exports.getProductChoosen=async (req,res)=>{
    const products=await productOrder.find().select().and([{user:req.user._id},{status:"In Progress"}]).populate([
        {
            path:"product",
            model:"Product",
            select:["name","price","category"]
        },

    ])
    if(products)
    return res.json({products})
    return res.status(400).json({err:products})
}
exports.saveProductOrder=async (req,res)=>{
 const products_deleted=await productOrder.deleteMany({
    user:req.user._id,
    status:'In Progress'
 });
 if(!products_deleted)
 return res.status(400).json({err:products_deleted})
 var p=null
 for(i=0;i<req.body.length;i++){
    p=await productOrder.create({
        product:req.body[i]._id,
        qte:req.body[i].qte,
        priceInQte:req.body[i].priceTotal,
        user:req.user._id,
        status:"In Progress",
    })
    if(!p)
    return res.status(400).json({err:p})    
 }
 return res.json({message:"Porducts Updated with success"});

}
exports.confirmOrder=async (req,res)=>{
 const order_client=await Order.create({
    user:req.user._id,
    priceOrder:req.params.priceTotale,
    status:"In Progress",
    is_delevered:"false",
 })  
 console.log(order_client._id) 
 const orders_prodduct=await productOrder.updateMany({
    user:req.user._id,
    status:"In Progress",
 },{
    $set:{order:order_client._id,status:"Ordered"}
 }
 );
 if(orders_prodduct)
 return res.json({message:"Order Confirmed With Success !!"});
 return res.status(400).json({err:orders_prodduct});
}