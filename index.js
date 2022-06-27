const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xldcc.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();

    const database = client.db('addidas_db');
    const productsCollection = database.collection('products');
    const ordersCollection = database.collection('orders');
    const commentCollection = database.collection('comment');
    //get products
    app.get('/products', async (req, res) => {
      console.log('hites');
      console.log(req.query);
      const cursor = await productsCollection.find({});
      const count = await productsCollection.countDocuments({});
      // const review = await productsCollection
      console.log(count);

      const page = req.query.page;
      const size = parseInt(req.query.size);
      console.log(page, size);
      let products;
      if (page) {
        products = await cursor
          .skip(page * 8)
          .limit(8)
          .toArray();
      } else {
        products = await cursor.toArray();
      }

      res.send({ products, count });
    });
    //update review
    app.put('/products/updateinfo', async (req, res) => {
      console.log('hites');
      const info = req.body;
      console.log(info);

      const result = await productsCollection
        .find({ _id: ObjectId(info.id) })
        .toArray();

      const review = parseFloat(result[0].ratings);
      const reviewer = parseFloat(result[0].ratingsCount);
      const ratings = (review * reviewer + info.newReview) / (reviewer + 1);
      const newReviewer = reviewer + 1;
      const newRatings = ratings.toFixed(2);
      const filter = { _id: ObjectId(info.id) };
      const updateDoc = {
        $set: {
          ratings: newRatings,
          ratingsCount: newReviewer,
        },
      };
      const updateResult = await productsCollection.updateOne(
        filter,
        updateDoc
      );
      res.json(updateResult);
      // console.log(ratings);
      // console.log(newRatings);
      // console.log(newReviewer);
    });
    //product load by id
    app.get('/view/:productId', async (req, res) => {
      const id = req.params.productId;

      const result = await productsCollection
        .find({ _id: ObjectId(id) })
        .toArray();

      res.send(result);
    });
    //save comment
    app.post('/comment', async (req, res) => {
      const info = req.body;
      const document = await commentCollection.insertOne(info);
      res.json(document);
    });
    //get Comment
    app.get('/getComment/:id', async (req, res) => {
      const pid = req.params.id;

      const result = await commentCollection.find({ id: pid }).toArray();
      const finalResult = result.reverse();
      res.send(finalResult);
      console.log(finalResult);
    });

    // save order information
    app.post('/order', async (req, res) => {
      const data = req.body;

      const document = await ordersCollection.insertOne(data);
      res.json(document);
    });

    //payment

    app.post('/create-payment-intent', async (req, res) => {
      const paymentInfo = req.body;
      const amount = paymentInfo.price * 100;

      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });
  } finally {
  }
}
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
//});
run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('Addidas is running');
});

app.listen(port, () => {
  console.log('server running at port', port);
});
