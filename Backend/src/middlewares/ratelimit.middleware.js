const rateLimit = require("express-rate-limit");

const paymentSuccessLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,             
  message: {
    success: false,
    message: "Too many payment attempts. Please wait."
  },
  standardHeaders: true,
  legacyHeaders: false,
});


module.exports = {
  paymentSuccessLimiter,
};