const { createCart, CartUpdate, CartDelete, getCart,getAll } = require("../Controllers/CartControllers");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

router.post('/',verifyToken,createCart)
router.put('/:id',verifyTokenAndAuthorization,CartUpdate)
router.delete('/:id',verifyTokenAndAuthorization,CartDelete)
router.get('/find/:userId',verifyTokenAndAuthorization,getCart)
router.get('/',verifyTokenAndAdmin,getAll)






module.exports = router;