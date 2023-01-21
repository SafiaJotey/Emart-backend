const express = require('express');
const router = express.Router();
const authController = require('../../Controllers/auth.controller');
const verifyToken = require('../../midlewires/verifyToken');
router.route('/signup').post(authController.createUser);
router.route('/login').post(authController.loginUser);
router.route('/getUser').get(verifyToken, authController.getUser);

module.exports = router;
