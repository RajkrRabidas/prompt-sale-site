require('dotenv').config();
const express = require('express');
const paymentRoutes = require('./routes/productRoutes.js');
const adminRoutes = require('./routes/admin.routes.js');
const path = require("path");
const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Static uploads folder (for debug / admin)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


app.use('/api/v1', paymentRoutes);

app.use("/api/admin", adminRoutes);



module.exports = app;