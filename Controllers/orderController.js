const orderServices = require('../Services/placeOrderService');
exports.placeOrder = async (req, res) => {
  try {
    const orders = await orderServices.placeOrderService(req.body);
    console.log(orders);
    res.status(200).send({
      status: 'success',
      message: 'Successfully order placed',
      data: orders,
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Cannot place the order ',
      error: error.message,
    });
  }
};
