const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;

const { connectToServer } = require('./utils/dbConnection');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const productRoutes = require('./Routes/v1/productRoutes');
const reviewProductRoutes = require('./Routes/v1/reviewProduct.route');
const authRoutes = require('./Routes/v1/auth.route');
const paymentRoutes = require('./Routes/v1/paymentRoute');
const orderRoutes = require('./Routes/v1/orderRoute');
connectToServer((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log('Running Server on port', port);
    });
    app.use('/api/v1/product', productRoutes);
    app.use('/api/v1/review', reviewProductRoutes);
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/payment', paymentRoutes);
    app.use('/api/v1/order', orderRoutes);
  } else {
    err;
  }
});

app.get('/', (req, res) => {
  res.send('Emart is running');
});
