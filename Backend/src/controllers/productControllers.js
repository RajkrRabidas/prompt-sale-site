const instance = require("../config/razorpayInstance");
const fs = require("fs");
const path = require("path");
const transporter = require("../config/nodemailer");
const orderModel = require("../models/order.model");
const verifiedPayment = require("../middlewares/verifyRazorpayPayment");
require("dotenv").config();

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

const handlePaymentSuccess = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const payment = req.verifiedPayment;
    const { contact, name, signature, email } = req.body;

    /* 💾 STEP 4: SAVE TO MONGODB */
    const order = await orderModel.create({
      razorpayOrderId: payment.order_id,
      razorpayPaymentId: payment.id,
      razorpaySignature: signature || payment.signature,
      email: email || payment.email || "not_provided@razorpay.com",
      amount: payment.amount / 100,
      currency: payment.currency,
      status: payment.status,
      method: payment.method,
      phone: contact || "not_provided",
      name: name || "not_provided",
    });



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
