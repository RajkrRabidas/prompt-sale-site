const instance = require("../config/razorpayInstance.js");
const crypto = require("crypto");
const fs = require("fs");

// Controller to handle Razorpay payment processing

const createOder = async (req, res) => {
    try {
        const options = {
            amount: Number(req.body.amount) * 100, // amount in the smallest currency unit
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
}

module.exports = { createOder };