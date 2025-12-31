const instance = require("../config/razorpayInstance");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const transporter = require("../config/nodemailer");
const orderModel = require("../models/order.model");
const checkoutSchema = require("../validator/checkout.schema");
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
    console.log("CREATE ORDER BODY:", req.body);

    const parsed = checkoutSchema.safeParse(req.body);

    if (!parsed.success) {
      const errors = {};
      parsed.error.issues.forEach((i) => {
        errors[i.path[0]] = i.message;
      });

      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        errors,
      });
    }
    const { productKey } = parsed.data;

    const product = PRODUCTS[productKey];
    if (!product) {
      return res.status(400).json({
        success: false,
        code: "INVALID_PRODUCT",
        message: "Selected product is not available",
      })
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
    console.error(err);
    res.status(500).json({
      success: false,
      code: "ORDER_CREATE_FAILED",
      message: "Unable to create order",
    });
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

    const { name } = req.body;
    console.log(name)

    const signature = req.headers["x-razorpay-signature"];

    const raw = req.rawBody || (req.body && typeof req.body === "object"
      ? Buffer.from(JSON.stringify(req.body))
      : req.body);

    const expectedSignature = crypto
      .createHmac("sha256", process.env.REZORPAY_API_SECRET)
      .update(raw)
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({
        success: false,
        code: "PAYMENT_VERIFICATION_FAILED",
        message: "Payment verification failed. Please try again.",
      });
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

    const order = await orderModel.create({
      razorpayPaymentId: payment.id,
      razorpayOrderId: payment.order_id,
      amount: payment.amount / 100,
      currency: payment.currency,
      email: payment.email,
      method: payment.method,
      status: payment.status,
      razorpaySignature: signature,
      name: req.body.name || "",
      contact: payment.contact,
    });

    console.log("seved order", order)

    // Send email with PDF attachment

    await transporter.sendMail({
      from: EMAIL_FROM,
      to: payment.email,
      subject: "Your AI Prompt Pack",
      html: `
        <h2>Payment Successful</h2>
        <p>Your AI Prompt Pack PDF is attached.</p>
      `,
      attachments: [
        {
          filename: "ai-prompt-pack.pdf",
          path: PDF_PATH,
          contentType: "application/pdf",
        },
      ],
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
      message: "Payment verified & email sent",
    });

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
    const order_id = req.params.order_id || req.params.orderId || req.query.orderId;

    if (!order_id) {
      return res.status(400).json({ success: false, message: "Order ID required" });
    }

    const order = await orderModel.findOne({
      razorpayOrderId: order_id,
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

// ngrok http 8000