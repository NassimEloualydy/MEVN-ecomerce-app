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
    date_delevered:"",
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
exports.getData=async (req,res)=>{
   const {first_name,last_name,price,status,delevered,date_delevered,product}=req.body;
   const searchQuery={};

   searchQuery.priceOrder={$regex:'.*'+price+'.*',$options:'i'};
   searchQuery.status={$regex:'.*'+status+'.*',$options:'i'};
   searchQuery.is_delevered={$regex:'.*'+delevered+'.*',$options:'i'};
   searchQuery.date_delevered={$regex:'.*'+date_delevered+'.*',$options:'i'};
   console.log(searchQuery)
   // const data=await Order.find(searchQuery).select().
   // populate([{
   //    path:"user",
   //    model:"user",
   //    match:{
   //       first_name:{$regex:'.*'+first_name+'.*',$options:"i"},
   //       last_name:{$regex:'.*'+last_name+'.*',$options:"i"},
   //    }
   // }])
   const data=await Order.aggregate([
      {
         $lookup:{
            from:"users",
            localField:"user",
            foreignField:"_id",
            as:"user",
         },
         $lookup:{
            from:"productOrders",
            localField:"_id",
            foreignField:"order",
            as:"product_order",
         }
      },{
         $project:{
            "_id":1,
            "priceOrder":1,
            "status":1,
            "is_delevered":1,
            "date_delevered":1,
            "user.first_name":1,
            "user.last_name":1,
            "product_order.product":1
         }
      }
   ])
   console.log(data)
    if(data)
    return res.json({orders:data})
    return res.status(400).json({err:data})
   }