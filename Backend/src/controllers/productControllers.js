const instance = require("../config/razorpayInstance");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const transporter = require("../config/nodemailer");
const orderModel = require("../models/order.model");
const verifiedPayment = require("../middlewares/verifyRazorpayPayment");

const EMAIL_FROM = process.env.FROM_EMAIL;
const PDF_PATH = path.join(__dirname, "../../uploads/test.pdf");

const PRODUCTS = {
  PROMPT_PACK: {
    amount: 1,
    name: "AI Prompt Pack"
  }
};


/* =======================
   CREATE ORDER
======================= */
const createOrder = async (req, res) => {
  try {
    const { productKey } = req.body;

    const product = PRODUCTS[productKey];
    if (!product) {
      return res.status(400).json({ error: "Invalid product" });
    }

    const order = await instance.orders.create({
      amount: product.amount * 100,
      currency: "INR",
      notes: {
        productKey,
        productName: product.name,
      },
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
const razorpayWebhookHandler = async (req, res) => {
  try {

    const {name} = req.body;

    const signature = req.headers["x-razorpay-signature"];

    // Use the raw body (Buffer) captured by express.json verify middleware
    // Fallback: if rawBody is not available, convert the parsed body to Buffer
    const raw = req.rawBody || (req.body && typeof req.body === "object"
      ? Buffer.from(JSON.stringify(req.body))
      : req.body);

    const expectedSignature = crypto
      .createHmac("sha256", process.env.REZORPAY_API_SECRET)
      .update(raw)
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({ success: false });
    }

    let event;
    if (req.rawBody) {
      event = JSON.parse(req.rawBody.toString());
    } else if (typeof req.body === "object") {
      event = req.body;
    } else {
      event = JSON.parse(req.body.toString());
    }

    if (event.event !== "payment.captured") {
      return res.status(200).json({ success: true });
    }

    const payment = event.payload.payment.entity;

    const exists = await orderModel.findOne({
      razorpayPaymentId: payment.id,
    });

    if (exists) {
      return res.status(200).json({ success: true });
    }

    await orderModel.create({
      razorpayPaymentId: payment.id,
      razorpayOrderId: payment.order_id,
      amount: payment.amount / 100,
      currency: payment.currency,
      email: payment.email,
      method: payment.method,
      status: payment.status,
      razorpaySignature: signature,
      name: payment.notes?.name || payment.name || req.body.name || "",
      phone: payment.contact || "",
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("Webhook Error:", err);
    return res.status(500).json({ success: false });
  }
};

/* =======================
   PAYMENT STATUS
======================= */

const paymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID required",
      });
    }

    const order = await orderModel.findOne({
      razorpayOrderId: orderId,
    });

    if (!order) {
      return res.status(200).json({
        success: true,
        paid: false,
        status: "PENDING",
      });
    }

    if (order.status === "captured") {
      return res.status(200).json({
        success: true,
        paid: true,
        status: "SUCCESS",
        paymentId: order.razorpayPaymentId,
      });
    }

    return res.status(200).json({
      success: true,
      paid: false,
      status: order.status,
    });

  } catch (error) {
    console.error("Payment Status Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


module.exports = {
  createOrder,
  getKey,
  razorpayWebhookHandler,
  paymentStatus,
};
