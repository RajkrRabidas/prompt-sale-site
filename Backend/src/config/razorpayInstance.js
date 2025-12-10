require('dotenv').config();
const Razorpay = require('razorpay');

const instance = new Razorpay({
  key_id: process.env.REZORPAY_API_KEY,
  key_secret: process.env.REZORPAY_API_SECRET,
});

module.exports = instance;
