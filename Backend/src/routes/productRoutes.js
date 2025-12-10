const express = require('express');
const { createOder, getKey, handlePaymentSuccess } = require('../controllers/productControllers.js');

const router = express.Router();


// Sample product route
router.post("/payment/process", createOder);
router.get("/payment/key", getKey);
router.post("/payment-success", handlePaymentSuccess);

module.exports = router;