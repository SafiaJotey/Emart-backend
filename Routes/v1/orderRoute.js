const express = require('express');
const router = express.Router();
const orderController = require('../../Controllers/orderController');

router.route('/placeOrder').post(orderController.placeOrder);
// router.route('/login').post(authController.loginUser);
// router.route('/getUser').get(verifyToken, authController.getUser);

module.exports = router;
