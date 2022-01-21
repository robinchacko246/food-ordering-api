const {Event} = require("../models/Event");


module.exports = {
    Events: async (req, res) => {
        const events = await Event.find();
      res.status(200).json(events);
    },
    getProduct:async (req,res)=>
    {
      console.log("inside product");
      const products = await Product.findOne({_id:req.params.id});
      res.status(200).json(products);
    }


}