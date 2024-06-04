const { createOrder, OrderUpdate, OrderDelete, getOrder,getAll, orderStats } = require("../Controllers/OrderControllers");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

router.post('/',verifyToken,createOrder)
router.put('/:id',verifyTokenAndAdmin,OrderUpdate)
router.delete('/:id',verifyTokenAndAdmin,OrderDelete)
router.get('/find/:userId',verifyTokenAndAuthorization,getOrder)
router.get('/',verifyTokenAndAdmin,getAll)
router.get('/income',verifyTokenAndAdmin,orderStats)







module.exports = router;