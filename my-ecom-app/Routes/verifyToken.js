const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) =>{
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) {
                return res.status(401).json('token is not valid');
            }
            req.user = user;
            // console.log('user:',user)
            next();
        });
    } else {
        return res.status(401).json('you are not authenticated')
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        
        if (req.user.id === req.params.id || req.user.isAdmin) {
            console.log("User is authorized");
            next();
        } else {
            console.log("User is not authorized");
            res.status(403).json('You are not allowed to do that');
        }
    });
};
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        
        if (req.user) {
            console.log("User is authorized");
            next();
        } else {
            console.log("User is not authorized");
            res.status(403).json('You are not allowed to do that');
        }
    });
};
module.exports = {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin}
