const {Product} = require("../models/Product");


module.exports = {
    Products: async (req, res) => {
        const products = await Product.find();
      res.status(200).json(products);
    }


}