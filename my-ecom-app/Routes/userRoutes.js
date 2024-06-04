const { userUpdate, userDelete, getUser, getAllUser, getUserStats } = require("../Controllers/UserControllers");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

router.put('/:id',verifyTokenAndAuthorization,userUpdate)
router.delete('/:id',verifyTokenAndAuthorization,userDelete)
router.get('/find/:id',verifyTokenAndAdmin,getUser)
router.get('/',verifyTokenAndAdmin,getAllUser)
router.get('/stats',verifyTokenAndAdmin,getUserStats)



module.exports = router;