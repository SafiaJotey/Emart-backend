const express = require('express');
const router = express.Router();
const productController = require('../../Controllers/product.controller');
router.route('/getProduct').get(productController.getAllProduct);
router.route('/:productId').get(productController.getProductDetails);
router.route('/addProduct').post(productController.createProduct);

module.exports = router;
// //product load by id
// app.get('/view/:productId', async (req, res) => {

// });
