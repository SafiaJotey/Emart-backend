const jwt = require('jsonwebtoken');
exports.generateToken = (userInfo) => {
  const payload = {
    email: userInfo.email,
  };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: '1h',
  });
  return token;
};
