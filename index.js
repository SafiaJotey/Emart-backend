const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
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
    //get products
    app.get('/products', async (req, res) => {
      const cursor = await productsCollection.find({});
      const count = await productsCollection.countDocuments({});
      console.log(count);
      console.log(req.query);
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

    // save order information
    app.post('/order', async (req, res) => {
      const data = req.body;

      const document = await ordersCollection.insertOne(data);
      res.json(document);
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
