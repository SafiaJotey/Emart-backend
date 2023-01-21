const ObjectId = require('mongodb').ObjectId;
const { getDb } = require('../utils/dbConnection');

exports.getProductService = async () => {
  const db = getDb();
  const product = await db.collection('products').find({}).toArray();
  const total = await db.collection('products').countDocuments({});
  return { product, total };
};
exports.getProductServiceByPage = async (page, limit) => {
  const db = getDb();
  const lim = parseInt(limit);
  const total = await db.collection('products').countDocuments({});
  const product = await db
    .collection('products')
    .find({})
    .skip(page * lim)
    .limit(lim)
    .toArray();

  return { total, product };
};
exports.getProductDetails = async (id) => {
  const db = getDb();

  const product = await db
    .collection('products')
    .find({ _id: ObjectId(id) })
    .toArray();

  return product;
};
exports.createProductService = async (product) => {
  const db = getDb();
  const result = await db.collection('products').insertOne(product);
  return result;
};
