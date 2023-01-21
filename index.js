const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;

const { connectToServer } = require('./utils/dbConnection');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const productRoutes = require('./Routes/v1/product.route');
const reviewProductRoutes = require('./Routes/v1/reviewProduct.route');
const authRoutes = require('./Routes/v1/auth.route');

connectToServer((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log('Running Server on port', port);
    });
    app.use('/api/v1/product', productRoutes);
    app.use('/api/v1/review', reviewProductRoutes);
    app.use('/api/v1/auth', authRoutes);

    // //update review
    // app.put('/products/updateinfo', async (req, res) => {
    //   ('hites');
    //   const info = req.body;
    //   (info);

    //   const result = await productsCollection
    //     .find({ _id: ObjectId(info.id) })
    //     .toArray();

    //   const review = parseFloat(result[0].ratings);
    //   const reviewer = parseFloat(result[0].ratingsCount);
    //   const ratings = (review * reviewer + info.newReview) / (reviewer + 1);
    //   const newReviewer = reviewer + 1;
    //   const newRatings = ratings.toFixed(2);
    //   const filter = { _id: ObjectId(info.id) };
    //   const updateDoc = {
    //     $set: {
    //       ratings: newRatings,
    //       ratingsCount: newReviewer,
    //     },
    //   };
    //   const updateResult = await productsCollection.updateOne(
    //     filter,
    //     updateDoc
    //   );
    //   res.json(updateResult);
    //   // (ratings);
    //   // (newRatings);
    //   // (newReviewer);
    // });

    // //save comment
    // app.post('/comment', async (req, res) => {
    //   const info = req.body;
    //   const document = await commentCollection.insertOne(info);
    //   res.json(document);
    // });
    // //get Comment
    // app.get('/getComment/:id', async (req, res) => {
    //   const pid = req.params.id;

    //   const result = await commentCollection.find({ id: pid }).toArray();
    //   const finalResult = result.reverse();
    //   res.send(finalResult);
    //   (finalResult);
    // });

    // // save order information
    // app.post('/order', async (req, res) => {
    //   const data = req.body;

    //   const document = await ordersCollection.insertOne(data);
    //   res.json(document);
    // });

    // //payment

    // app.post('/create-payment-intent', async (req, res) => {
    //   const paymentInfo = req.body;
    //   const amount = paymentInfo.price * 100;

    //   // Create a PaymentIntent with the order amount and currency
    //   const paymentIntent = await stripe.paymentIntents.create({
    //     amount: amount,
    //     currency: 'usd',
    //     automatic_payment_methods: {
    //       enabled: true,
    //     },
    //   });
  } else {
    err;
  }
});

app.get('/', (req, res) => {
  res.send('Emart is running');
});
