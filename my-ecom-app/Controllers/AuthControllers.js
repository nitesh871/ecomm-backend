const UserModel = require('../Models/UserModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
    let errors = { email: "", password: "" };

    if (err.message === "incorrect email") errors.email = "That email is not registered";
    if (err.message === "incorrect password") errors.password = "That password is incorrect";

    if (err.code === 11000) {
        errors.email = "Email is already registered";
        return errors;
    }

    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

module.exports.register = async ( req,res,next ) =>{  
     try {
    const { userName, email, password,confirmPassword } = req.body;
    if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
    }
    const user = await UserModel.create({userName, email, password});
    // console.log('user:',user)
    // user.save()
    console.log("user:",user)
    res.status(201).json({user:user._id,created:true})
} catch(err){
    console.log(err)
    const errors = handleErrors(err);
    res.json({errors,created:false})
}};

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ errors: { message: 'Email and password are required' }, created: false });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Error("incorrect email");
        }

       
        // Log the hashed password from the database
        // console.log('Password in DB:', user.password);

        // Compare the provided password with the hashed password in the database
        const auth = await bcrypt.compare(password, user.password);
        // console.log('bcrypt compare result:', auth); // Log the result
        if (!auth) {
            throw new Error("incorrect password");
        }
        console.log("user",req.body)

        const accessToken = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin
        } , process.env.JWT_SEC,
    {expiresIn:'3d'})

    console.log('token',accessToken)

        req.session.userId = user._id; // Create a session
        // console.log("userid:",user._id)
        res.status(200).json({ ...user._doc, created: true,accessToken });
    } catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        res.status(400).json({ errors, created: false });
    }
};

