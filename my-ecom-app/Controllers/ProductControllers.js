const ProductModel = require("../Models/ProductModel")

module.exports.createProduct = async (req, res, next) => {

    const newProduct = new ProductModel(req.body)
    console.log(newProduct)

    try{

        const savedProduct = await newProduct.save()
        console.log(savedProduct)
        res.status(200).json(savedProduct)

    }catch(err){
        res.status(500).json(err)
    }
}


module.exports.productUpdate = async (req, res, next) => {
    
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  module.exports.productDelete = async (req, res, next) => {
    try {
      await ProductModel.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  module.exports.getProduct = async (req, res, next) => {
    try {
      const Product = await ProductModel.findById(req.params.id);
      // console.log('userid:',req.params.id)
      if (!Product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json(Product);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  module.exports.getAllProducts = async (req, res, next) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
      let products;

      if(qNew){
        products = await ProductModel.find().sort({createdAt:-1}).limit(1)
      } else if(qCategory){
        products = await ProductModel.find({
            categories:{
                $in:[qCategory]
            }
        })
      }else{
        products = await ProductModel.find()
      }
      console.log(products)
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  