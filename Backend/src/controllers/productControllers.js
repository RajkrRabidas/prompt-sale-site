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

  console.log(req.body);
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    console.log(req.body);

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({ error: "Invalid payment data" });
    }

    /* 🔐 STEP 1: Verify Signature */
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.REZORPAY_API_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Signature verification failed" });
    }

    /* 🔍 STEP 2: Fetch payment from Razorpay */
    const payment = await instance.payments.fetch(razorpay_payment_id);

    const email = payment.email;

    if (!email) {
      return res.status(400).json({ error: "Email not found in payment" });
    }

    /* 📄 STEP 3: Check PDF */
    if (!fs.existsSync(PDF_PATH)) {
      return res.status(500).json({ error: "PDF missing on server" });
    }

    const pdfBuffer = fs.readFileSync(PDF_PATH);

    /* 💾 STEP 3.5: Save to MongoDB */
    const alreadyExists = await orderModel.findOne({
      razorpayPaymentId: razorpay_payment_id,
    });

    if (alreadyExists) {
      return res.status(200).json({
        success: true,
        message: "Payment already processed",
      });
    }

    await orderModel.create({
      email,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      amount: payment.amount / 100,
      currency: payment.currency,
    });


    /* 📧 STEP 4: Send Email */
    await transporter.sendMail({
      from: EMAIL_FROM,
      to: email,
      subject: "Your AI Prompt Pack",
      html: `
        <h2>Payment Successful</h2>
        <p>Your AI Prompt Pack PDF is attached.</p>
      `,
      attachments: [
        {
          filename: "ai-prompt-pack.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified & email sent",
    });

  } catch (err) {
    console.error("Payment Success Error:", err);
    res.status(500).json({ error: "Payment processing failed" });
  }
};

module.exports = {
  createOrder,
  getKey,
  handlePaymentSuccess,
};
