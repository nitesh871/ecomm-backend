const CartModel = require("../Models/CartModel")

module.exports.createCart = async (req, res, next) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Find the cart document associated with the user
        let cart = await CartModel.findOne({ userId });

        // If the cart doesn't exist, create a new one
        if (!cart) {
            cart = new CartModel({ userId, products: [{ productId, quantity }] });
        } else {
            // If the cart exists, add the new product to the products array
            cart.products.push({ productId, quantity });
        }

        // Save the updated cart document to the database
        const savedCart = await cart.save();

        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
};


module.exports.CartUpdate = async (req, res, next) => {
    
    try {
      const updatedCart = await CartModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  module.exports.CartDelete = async (req, res, next) => {
    try {
      await CartModel.findByIdAndDelete(req.params.id);
      res.status(200).json("Cart has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  module.exports.getCart = async (req, res, next) => {
    try {
      const Cart = await CartModel.findOne({userId:req.params.userId});
      // console.log('userid:',req.params.id)
      if (!Cart) {
        return res.status(404).json({ error: "Cart not found" });
      }
      res.status(200).json(Cart);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  module.exports.getAll = async (req, res, next) => {
    try{
       const carts = await CartModel.find()
       res.status(200).json(carts)
    }catch(err){
        res.status(500).json(err)
    }
  };
  
  