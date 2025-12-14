const express = require('express');
const { createOrder, getKey, handlePaymentSuccess } = require('../controllers/productControllers.js');

const router = express.Router();


// Sample product route
router.post("/payment/process", createOrder);
router.get("/payment/key", getKey);
router.post("/payment-success", handlePaymentSuccess);

module.exports = router;