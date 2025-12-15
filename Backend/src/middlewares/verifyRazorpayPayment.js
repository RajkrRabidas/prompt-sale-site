const crypto = require("crypto");
const razorpayInstance = require("../config/razorpayInstance");
const Order = require("../models/order.model");

const verifyRazorpayPayment = async (req, res, next) => {
  try {
    const {
      paymentId,
      orderId,
      signature,
      amount,
    } = req.body;

    /* 1️⃣ Basic validation */
    if (!paymentId || !orderId || !signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment fields",
      });
    }

    /* 2️⃣ Signature verification */
    const body = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.REZORPAY_API_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid Razorpay signature",
      });
    }

    /* 3️⃣ Prevent duplicate processing */
    const alreadyProcessed = await Order.findOne({
      razorpayPaymentId: paymentId,
    });

    if (alreadyProcessed) {
      return res.status(200).json({
        success: true,
        message: "Payment already processed",
      });
    }

    /* 4️⃣ Fetch payment from Razorpay */
    const payment = await razorpayInstance.payments.fetch(paymentId);

    if (!payment) {
      return res.status(400).json({
        success: false,
        message: "Payment not found",
      });
    }

    /* 5️⃣ Critical payment checks */
    if (payment.status !== "captured") {
      return res.status(400).json({
        success: false,
        message: "Payment not captured",
      });
    }

    if (amount && payment.amount !== amount * 100) {
      return res.status(400).json({
        success: false,
        message: "Payment amount mismatch",
      });
    }

    if (payment.currency !== "INR") {
      return res.status(400).json({
        success: false,
        message: "Invalid currency",
      });
    }

    /* 6️⃣ Attach verified payment to request */
    req.verifiedPayment = payment;

    next(); // payment is legit, continue

  } catch (err) {
    console.error("Payment verification error:", err);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};

module.exports = verifyRazorpayPayment;
