require('dotenv').config();
const express = require('express');
const paymentRoutes = require('./routes/productRoutes.js');
const path = require("path");

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Static uploads folder (for debug / admin)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(express.json());

app.use('/api/v1', paymentRoutes);


module.exports = app;