const ObjectId = require('mongodb').ObjectId;
const { getDb } = require('../utils/dbConnection');
exports.updateProductReview = async (info) => {
  const db = getDb();
  const result = await db
    .collection('products')
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
  const reviewComment = {
    id: info.id,
    name: info.name,
    userEmail: info.userEmail,
    newReview: info.newReview,
    comment: info.comment,
  };
  const reviewCreation = await db.collection('review').insertOne(reviewComment);
  const updateResult = await db
    .collection('products')
    .updateOne(filter, updateDoc);

  return updateResult;
};

exports.getReviewProductService = async (productId) => {
  const db = getDb();
  const reviews = await db
    .collection('review')
    .find({ id: productId })
    .toArray();

  return reviews;
};
