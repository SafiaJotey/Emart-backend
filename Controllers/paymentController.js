const paymentServices = require('../Services/paymentServices.js');
exports.createIntent = async (req, res) => {
  try {
    const paymentInfo = req.body;
    const amount = paymentInfo.price * 100;
    const payment = {
      amount: amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    };

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await paymentServices.createProductService(payment);
    res.status(200).send({
      status: 'success',
      message: 'Successfully create a Product',
      data: paymentIntent,
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Cannot create a product ',
      error: error.message,
    });
  }
};
