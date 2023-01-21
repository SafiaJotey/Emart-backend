const reviewProductServices = require('../Services/reviewProduct.services');
exports.createReviewProduct = async (req, res) => {
  try {
    const info = req.body;

    const result = await reviewProductServices.updateProductReview(info);
    // res.json(updateResult);
    // (ratings);
    // (newRatings);
    // (newReviewer);
    res.status(200).send({
      status: 'success',
      message: 'Successfully create a Product',
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Cannot create a product ',
      error: error.message,
    });
  }
};

exports.getReviewProduct = async (req, res) => {
  try {
    const id = req.params.id;

    reviews = await reviewProductServices.getReviewProductService(id);

    res.status(200).send({
      status: 'success',
      message: 'successfully get all products',
      data: reviews,
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Cannot get all products ',
      error: error.message,
    });
  }
};
