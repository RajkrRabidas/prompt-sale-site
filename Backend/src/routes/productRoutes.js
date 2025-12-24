const express = require('express');
const { createOrder, getKey, paymentStatus } = require('../controllers/productControllers.js');
const verifyRazorpayPayment = require('../middlewares/verifyRazorpayPayment.js');
const { paymentSuccessLimiter } = require('../middlewares/ratelimit.middleware.js');

const router = express.Router();


// Sample product route
router.post("/payment/process", createOrder);
router.get("/payment/key", getKey);

router.get("/payment/status/:order_id", paymentStatus);



module.exports = router;