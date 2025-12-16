const express = require("express");
const jwt = require("jsonwebtoken");
const { adminAuth } = require("../middlewares/adminAuth");
const orderModel = require("../models/order.model");

const router = express.Router();

/* =========================
   ADMIN LOGIN
========================= */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing credentials" });
  }

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign(
    { role: "admin", email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );

  res.json({
    success: true,
    token
  });
});

/* =========================
   VERIFY TOKEN
========================= */
router.get("/me", adminAuth, (req, res) => {
  res.json({
    success: true,
    admin: req.admin
  });
});

/* =========================
   GET ALL ORDERS (PROTECTED)
========================= */
router.get("/orders", adminAuth, async (req, res) => {
  const orders = await orderModel
    .find()
    .sort({ createdAt: -1 })
    .limit(200);

  res.json({ success: true, orders });
});

module.exports = router;

