const ObjectId = require('mongodb').ObjectId;
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const { getDb } = require('../utils/dbConnection');
exports.createProductService = async (payment) => {
  const result = await stripe.paymentIntents.create(payment);
  return result;
};
