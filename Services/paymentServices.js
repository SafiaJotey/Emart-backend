const ObjectId = require('mongodb').ObjectId;
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const { getDb } = require('../utils/dbConnection');
exports.createProductService = async (payment) => {
  const result = await stripe.paymentIntents.create(payment);
  return result;
};

// exports.bookingtoPayServices = async (bookingId) => {
//   const db = getDb();
//   console.log(bookingId);

//   const result = await db
//     .collection('bookings')
//     .find({ _id: ObjectId(bookingId) })
//     .toArray();
//   return result;
// };
