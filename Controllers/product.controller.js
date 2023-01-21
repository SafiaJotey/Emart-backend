const productServices = require('../Services/product.services');
exports.getAllProduct = async (req, res) => {
  try {
    const page = req.query.page;

    let products;

    if (page) {
      products = await productServices.getProductServiceByPage(page, 8);
    } else {
      products = await productServices.getProductService();
    }

    res.status(200).send({
      status: 'success',
      message: 'successfully get all products',
      data: products,
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Cannot get all products ',
      error: error.message,
    });
  }
};
exports.getProductDetails = async (req, res) => {
  try {
    const id = req.params.productId;

    const result = await productServices.getProductDetails(id);

    res.status(200).send({
      status: 'success',
      message: 'successfully get the product details',
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Cannot get  product Details ',
      error: error.message,
    });
  }
};
exports.createProduct = async (req, res) => {
  try {
    const blogs = await productServices.createProductService(req.body);
    res.status(200).send({
      status: 'success',
      message: 'Successfully create a Product',
      data: blogs,
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Cannot create a product ',
      error: error.message,
    });
  }
};
