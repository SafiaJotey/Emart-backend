const ObjectId = require('mongodb').ObjectId;
const { getDb } = require('../utils/dbConnection');
exports.createProductService = async (payment) => {
  const result = await await stripe.paymentIntents.create(payment);
  return result;
};
