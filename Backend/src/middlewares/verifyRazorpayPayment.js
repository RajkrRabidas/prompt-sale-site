const crypto = require("crypto");
const razorpayInstance = require("../config/razorpayInstance");
const Order = require("../models/order.model");

const verifyRazorpayPayment = async (req, res, next) => {
  try {
    const { paymentId, orderId, signature } = req.body;

    if (!paymentId || !orderId || !signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment fields",
      });
    }

    /* 1️⃣ Verify signature */
    const body = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", razorpayInstance.key_secret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid Razorpay signature",
      });
    }

    /* 2️⃣ Fetch payment (source of truth) */
    const payment = await razorpayInstance.payments.fetch(paymentId);

    if (!payment) {
      return res.status(400).json({
        success: false,
        message: "Payment not found",
      });
    }

    /* 3️⃣ Accept only captured payments */
    if (payment.status !== "captured") {
      return res.status(202).json({
        success: false,
        message: "Payment pending capture",
      });
    }

    /* 4️⃣ Prevent duplicates */
    const alreadyProcessed = await Order.findOne({
      razorpayPaymentId: paymentId,
    });

    if (alreadyProcessed) {
      return res.status(200).json({
        success: true,
        message: "Payment already processed",
      });
    }

    /* 5️⃣ Attach verified payment */
    req.verifiedPayment = payment;
    next();

  } catch (err) {
    console.error("Payment verification error:", err);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};

module.exports = verifyRazorpayPayment;
