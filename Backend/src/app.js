require('dotenv').config();
const express = require('express');
const productRoutes = require('./routes/productRoutes.js');

const app = express();


app.use(express.json());

app.use('/api/v1', productRoutes);


module.exports = app;