const instance = require("../config/razorpayInstance");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const transporter = require("../config/nodemailer");
const orderModel = require("../models/order.model");
require("dotenv").config();

const EMAIL_FROM = process.env.FROM_EMAIL;
const PDF_PATH = path.join(__dirname, "../../uploads/test.pdf");

/* =======================
   CREATE ORDER
======================= */
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount required" });
    }

    const order = await instance.orders.create({
      amount: Number(amount) * 100,
      currency: "INR",
    });

    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error("Create Order Error:", err);
    res.status(500).json({ error: "Order creation failed" });
  }
};

/* =======================
   GET KEY
======================= */
const getKey = (req, res) => {
  res.status(200).json({
    key: process.env.REZORPAY_API_KEY,
  });
};

/* =======================
   PAYMENT SUCCESS
======================= */
const handlePaymentSuccess = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const {
      paymentId,
      orderId,
      signature,
      contact,
      name
    } = req.body;

    if (!paymentId || !orderId || !signature) {
      return res.status(400).json({ error: "Payment data missing" });
    }

    /* 🔐 STEP 1: VERIFY SIGNATURE */
    const sign = `${orderId}|${paymentId}`;
    const expected = crypto
      .createHmac("sha256", process.env.REZORPAY_API_SECRET)
      .update(sign)
      .digest("hex");

    if (expected !== signature) {
      return res.status(400).json({ error: "Signature mismatch" });
    }

    /* 🔍 STEP 2: FETCH PAYMENT FROM RAZORPAY (SOURCE OF TRUTH) */
    const payment = await instance.payments.fetch(paymentId);

    if (!payment) {
      return res.status(400).json({ error: "Payment not found" });
    }

    /* 💾 STEP 3: PREVENT DUPLICATES */
    const exists = await orderModel.findOne({
      razorpayPaymentId: paymentId,
    });

    if (exists) {
      return res.status(200).json({ success: true, message: "Already processed" });
    }

    /* 💾 STEP 4: SAVE TO MONGODB */
    const order = await orderModel.create({
      razorpayOrderId: orderId,
      razorpayPaymentId: paymentId,
      razorpaySignature: signature,
      email: payment.email || "not_provided@razorpay.com",
      amount: payment.amount / 100,
      currency: payment.currency,
      status: payment.status,
      method: payment.method,
      phone: contact || "not_provided",
      name: name || "not_provided",
    });

    console.log("SAVED:", order._id);

    /* 📧 STEP 5: EMAIL */
    if (fs.existsSync(PDF_PATH) && payment.email) {
      await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: payment.email,
        subject: "Your AI Prompt Pack",
        attachments: [
          {
            filename: "ai-prompt-pack.pdf",
            path: PDF_PATH,
          },
        ],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment saved + email sent",
    });

  } catch (err) {
    console.error("PAYMENT ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};



module.exports = {
  createOrder,
  getKey,
  handlePaymentSuccess,
};
