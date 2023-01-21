const ObjectId = require('mongodb').ObjectId;
const { getDb } = require('../utils/dbConnection');
const bcrypt = require('bcryptjs');
exports.createUserService = async (userInfo) => {
  const db = getDb();
  let result;

  const product = await db
    .collection('users')
    .find({ email: userInfo.email })
    .toArray();

  if (!product.length) {
    result = await db.collection('users').insertOne(userInfo);
    return result;
  }
  result = await db.collection('users').insertOne(undefined);
  return result;
};

exports.findUserByEmail = async (email) => {
  const db = getDb();

  const user = await db.collection('users').findOne({ email: email });

  return user;
};

exports.comparePassword = async (password, userPassword) => {
  const isPassCorrect = await bcrypt.compare(password, userPassword);

  return isPassCorrect;
};
