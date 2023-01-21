const express = require('express');
const router = express.Router();
const reviewProductController = require('../../Controllers/reviewProduct.controller');
router.route('/updateReview').post(reviewProductController.createReviewProduct);
router.route('/:id').get(reviewProductController.getReviewProduct);
module.exports = router;
