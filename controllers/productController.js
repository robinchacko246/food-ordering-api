const {Product} = require("../models/Product");


module.exports = {
    Products: async (req, res) => {
        const products = await Product.find();
      res.status(200).json(products);
    },
    getProduct:async (req,res)=>
    {
      console.log("inside product");
      const products = await Product.findOne({_id:req.params.id});
      res.status(200).json(products);
    }


}