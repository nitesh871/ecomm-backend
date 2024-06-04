const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
  
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'User Name is required'],
        
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
        // You can add more validations for email format if needed
    },
    password: {
        type: String,
        required: [true, 'Password is required']
        // You can add more validations for password if needed
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
}
);


userSchema.pre("save",async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})



module.exports = mongoose.model('Users', userSchema);
