const express = require('express');
const router = express.Router();
const productController = require('../../Controllers/productController');
router.route('/getProduct').get(productController.getAllProduct);
router.route('/getPopularProduct').get(productController.getPopularProduct);
router.route('/addProduct').post(productController.createProduct);

router.route('/:productId').get(productController.getProductDetails);

module.exports = router;
// //product load by id
// app.get('/view/:productId', async (req, res) => {

// });
