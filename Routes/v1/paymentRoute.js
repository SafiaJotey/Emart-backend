const express = require('express');
const router = express.Router();
const paymentController = require('../../Controllers/paymentController.js');
const verifyToken = require('../../midlewires/verifyToken.js');
router.route('/create-payment-intent').post(paymentController.createIntent);
// router.route('/:id').get(paymentController.bookingToPay);

module.exports = router;
