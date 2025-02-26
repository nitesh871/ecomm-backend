const mongoose = require('mongoose');
  
const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'userId is required'],
    },
    products: [
        {
            productId:{
                type:String,
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ]
    },{
    timestamps:true
});




module.exports = mongoose.model('Carts', CartSchema);
