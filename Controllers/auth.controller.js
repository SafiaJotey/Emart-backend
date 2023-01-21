const authServices = require('../Services/auth.services');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/Token');
exports.createUser = async (req, res) => {
  try {
    const userInfo = req.body;

    const hashedPassword = bcrypt.hashSync(userInfo.password);
    userInfo.password = hashedPassword;
    result = await authServices.createUserService(userInfo);

    res.status(200).send({
      status: 'success',
      message: 'successfully create an user',
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Cannot create an user',
      error: error.message,
    });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // const hashedPassword = bcrypt.hashSync(userInfo.password);
    // userInfo.password = hashedPassword;
    // result = await authServices.createUserService(userInfo);
    // res.status(200).send({
    //   status: 'success',
    //   message: 'successfully create an user',
    //   data: result,
    // });

    if (!email || !password) {
      return res.status(401).send({
        status: 'fail',
        error: 'Please provide your cradentials to login',
      });
    }
    const user = await authServices.findUserByEmail(email);

    if (!user) {
      return res.status(401).send({
        status: 'fail ',
        error: 'No user found! Please create an account',
      });
    }

    const isPassCorrect = await authServices.comparePassword(
      password,
      user.password
    );
    if (!isPassCorrect) {
      return res.status(403).send({
        status: 'fail',
        error: 'Email or Password not Correct',
      });
    }
    const token = await generateToken(user);
    const { password: pwd, ...others } = user;

    res.status(200).send({
      status: 'Sucess',
      message: 'Successfully loggedin',
      data: {
        others,
        token,
      },
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'something went wrong ',
      error: error.message,
    });
  }
};
//getUser
exports.getUser = async (req, res) => {
  try {
    // console.log(hited, req.user);
    result = await authServices.findUserByEmail(req.user?.email);

    const { password: pws, ...others } = result;
    res.status(200).send({
      status: 'success',
      message: 'successfully get the user',
      data: others,
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Cannot get  the user ',
      error: error.message,
    });
  }
};

/*
1. if email pass given
2.if not given send res
3. if given load the user with emil
4.if no user send res to reg
5.if load user check pass
6. if pass not match send res




*/
