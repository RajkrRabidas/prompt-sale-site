const instance = require("../config/razorpayInstance.js");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const transporter = require("../config/nodemailer.js");
const axios = require("axios");
require("dotenv").config();

// Load ENV values
const EMAIL_FROM = process.env.FROM_EMAIL || "das752101@gmail.com";

// Absolute path of your PDF
// __dirname is Backend/src/controllers -> need to go up two levels to Backend/uploads
const PDF_PATH = path.join(__dirname, "../../uploads/test.pdf");

// Controller to handle Razorpay payment processing
const createOder = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount) * 100, // amount in paise
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.error("createOder error:", error);
    return res.status(500).json({ error: "Order creation failed" });
  }
};

const getKey = (req, res) => {
  res.status(200).json({ key: process.env.REZORPAY_API_KEY });
};

// Verify Razorpay signature + send email using Resend
const handlePaymentSuccess = async (req, res) => {
  try {
    console.log("/payment-success called with body:", req.body);
    // Accept both Razorpay format + custom format
    const paymentId =
      req.body.paymentId || req.body.razorpay_payment_id;
    const orderId =
      req.body.orderId || req.body.razorpay_order_id;
    const signature =
      req.body.signature || req.body.razorpay_signature;
    const email = req.body.email;

    if (!paymentId || !orderId || !signature || !email) {
      console.error("Missing fields", { paymentId, orderId, signature, email });
      return res.status(400).json({
        error: "Missing required fields",
        received: req.body,
      });
    }

    // Verify signature (use the same secret name as razorpayInstance.js)
    const body = `${orderId}|${paymentId}`;
    const expectedSignature = crypto.createHmac("sha256", process.env.REZORPAY_API_SECRET).update(body).digest("hex");
    console.log("Signature check", { body, expectedSignature, receivedSignature: signature });
    if (expectedSignature !== signature) {
      console.error("Signature mismatch", { expectedSignature, signature });
      return res.status(400).json({
        error: "Signature verification failed",
      });
    }

    // Check PDF file
    if (!fs.existsSync(PDF_PATH)) {
      return res.status(500).json({
        error: "PDF not found on server",
      });
    }

    // Read PDF buffer
    const pdfBuffer = fs.readFileSync(PDF_PATH);

    // Send email with PDF attachment
    try {
      const info = await transporter.sendMail({
        from: EMAIL_FROM,
        to: req.body.email,
        subject: "Your AI Prompt Pack — Thanks for Purchase",
        html: `
          <h2>Thank you for purchasing!</h2>
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
      console.log("Email sent", info && info.accepted ? info.accepted : info);
    } catch (mailErr) {
      console.error("Email send failed", mailErr);
      return res.status(500).json({ error: "Email send failed", details: mailErr.message });
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified + email sent successfully",
    });
  } catch (error) {
    console.error("handlePaymentSuccess error:", error);
    return res.status(500).json({
      error: "Payment success handling failed",
      details: error.message,
    });
  }
};

module.exports = { createOder, getKey, handlePaymentSuccess };
