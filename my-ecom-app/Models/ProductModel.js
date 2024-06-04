const mongoose = require('mongoose');
  
const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
        unique:true
    },
    desc: {
        type: String,
        required: [true, 'Description is required'],
        
        // You can add more validations for email format if needed
    },
    img: {
        type: String,
        required: [true, 'Img is required']
        // You can add more validations for password if needed
    },
    categories: {
        type: Array
        
        // You can add more validations for password if needed
    },
    size: {
        type: Array,
        
        // You can add more validations for password if needed
    },
    color: {
        type: Array,
        
        // You can add more validations for password if needed
    },
    price: {
        type: String,
        required: [true, 'Price is required']
        // You can add more validations for password if needed
    },
    inStock:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
});




module.exports = mongoose.model('Products', ProductSchema);
