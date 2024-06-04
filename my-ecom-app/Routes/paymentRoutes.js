const { createPayment } = require("../Controllers/PaymentControllers");

const router = require("express").Router();

router.post('/payment',createPayment)

module.exports = router;