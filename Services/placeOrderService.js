const ObjectId = require('mongodb').ObjectId;
const { getDb } = require('../utils/dbConnection');
exports.placeOrderService = async (orderInfo) => {
  const db = getDb();
  const result = await db.collection('orders').insertOne(orderInfo);
  return result;
};
