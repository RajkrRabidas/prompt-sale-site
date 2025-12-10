const express = require('express');
const { createOder } = require('../controllers/productControllers.js');

const router = express.Router();


// Sample product route
router.route("/payment/process").post(createOder);

module.exports = router;