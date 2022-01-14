
const {Order} = require("../models/Order");

module.exports = {
   
    createOrder:async (req,res)=>
    {
      
      const Orders = await Order.create(req.body);
      res.status(200).json(Orders);
    },
    getOrder:async (req,res)=>
    {
     
      const Orders = await Order.findOne({_id:req.params.id});
      res.status(200).json(Orders);
    }


}