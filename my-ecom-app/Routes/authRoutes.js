const { register, login } = require("../Controllers/AuthControllers");
// const { validateFormData } = require('../Middlewares/userMiddleware');
const router = require("express").Router();

router.post('/');
router.post("/register",register);
router.post("/login",login);


module.exports = router;