const { createProduct, productUpdate, productDelete, getProduct,getAllProducts } = require("../Controllers/ProductControllers");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

router.post('/',verifyToken,createProduct)
router.put('/:id',verifyTokenAndAdmin,productUpdate)
router.delete('/:id',verifyTokenAndAdmin,productDelete)
router.get('/find/:id',verifyTokenAndAdmin,getProduct)
router.get('/',verifyTokenAndAdmin,getAllProducts)






module.exports = router;