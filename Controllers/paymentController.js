const paymentServices = require('../Services/paymentServices.js');
exports.createIntent = async (req, res) => {
  try {
    const paymentInfo = req.body;
    console.log(paymentInfo);
    const amount = paymentInfo.price * 100;
    const payment = {
      amount: amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    };
    // exports.bookingToPay = async (req, res) => {
    //   // console.log(req.params);
    //   try {
    //     const result = await paymentServices.bookingtoPayServices(
    //       req.params.id
    //     );

    //     res.status(200).send({
    //       status: 'success',
    //       message: ' Successfully get  package by id',
    //       data: result,
    //     });
    //   } catch (error) {
    //     res.status(400).send({
    //       status: 'fail',
    //       message: 'Cannot get package',
    //       error: error.message,
    //     });
    //   }
    // };

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await paymentServices.createProductService(payment);
    console.log(payment);
    res.status(200).send({
      status: 'success',
      message: 'Successfully create an intant',
      data: paymentIntent,
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Cannot create an intant ',
      error: error.message,
    });
  }
};
