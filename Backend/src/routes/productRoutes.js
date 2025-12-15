const express = require('express');
const { createOrder, getKey, handlePaymentSuccess } = require('../controllers/productControllers.js');
const verifyRazorpayPayment = require('../middlewares/verifyRazorpayPayment.js');

const router = express.Router();


// Sample product route
router.post("/payment/process", createOrder);
router.get("/payment/key", getKey);
router.post("/payment-success", verifyRazorpayPayment, handlePaymentSuccess);

module.exports = router;