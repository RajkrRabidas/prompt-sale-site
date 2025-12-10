const instance = require("../config/razorpayInstance.js");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

// Load ENV values
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || "no-reply@yourdomain.com";

// Absolute path of your PDF
const PDF_PATH = path.join(__dirname, "../uploads/prompt-pack.pdf");

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
    const { paymentId, orderId, signature, email } = req.body;

    console.log(email)

    console.log("handlePaymentSuccess called with:", req.body);

    if (!paymentId || !orderId || !signature || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Verify signature
    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({
        error: "Payment verification failed (invalid signature)",
      });
    }

    // Check PDF exists
    if (!fs.existsSync(PDF_PATH)) {
      return res.status(500).json({ error: "PDF not found on server" });
    }

    // Read & convert PDF to base64
    const pdfBuffer = fs.readFileSync(PDF_PATH);
    const pdfBase64 = pdfBuffer.toString("base64");

    // Send email through Resend REST API
    const resp = await axios.post(
      "https://api.resend.com/emails",
      {
        from: FROM_EMAIL,
        to: email,
        subject: "Your AI Prompt Pack — Thank you for your purchase",
        html: `
                <div style="font-family:system-ui, Arial; line-height:1.5;">
                  <h2>Thanks for your purchase!</h2>
                  <p>Your AI Prompt Pack is attached to this email.</p>
                  <p>If you face any issue, reply to this email.</p>
                </div>
                `,
        attachments: [
          {
            filename: "AI-Prompt-Pack.pdf",
            type: "application/pdf",
            content: pdfBase64,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.json({
      success: true,
      sent: true,
      resendStatus: resp.status,
    });



  } catch (err) {
    console.error(
      "handlePaymentSuccess error:",
      err.response ? err.response.data : err.message
    );
    return res.status(500).json({
      error: "Failed to process payment success",
      details: err.message,
    });
  }
};

module.exports = { createOder, getKey, handlePaymentSuccess };
