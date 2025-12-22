const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    razorpayOrderId: {
      type: String,
      required: true,
      index: true,
    },

    razorpayPaymentId: {
      type: String,
      required: true,
      unique: true,
    },

    razorpaySignature: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    status: {
      type: String,
      enum: [
        "created",
        "authorized",
        "captured",
        "failed",
        "refunded",
      ],
      required: true,
    },

    method: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
