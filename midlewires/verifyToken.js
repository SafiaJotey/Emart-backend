const jwt = require('jsonwebtoken');
const { promisify } = require('util');
module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(' ')?.[1];

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        error: "you're not logged in",
      });
    }
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.TOKEN_SECRET
    );
    // console.log('decode', decoded);
    req.user = decoded;
    // console.log(req.user);
    next();
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      error: 'Invalid token',
    });
  }
};
