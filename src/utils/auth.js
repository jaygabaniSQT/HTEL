const jwt = require('jsonwebtoken');
const message = require('./message');
const { StatusCodes } = require('http-status-codes');
const path = require('path');
const { executeQuery } = require('./query');
const getResponse = require('./utils');

module.exports = {
  generateToken: (request) => {
    const token = jwt.sign(
      { userId: request.userId },
      process.env.PRIVATE_KEY,
      {
        expiresIn: '24hour',
      },
    );
    return token;
  },

  verifyToken: (req, res, next) => {
    try {
      const token_value = req.header('x-auth-token');
      if (token_value == undefined) {
        return res
          .status(StatusCodes.OK)
          .send(getResponse(0, message.TOKEN_MISSING, {}));
      }
      const verify = jwt.verify(token_value, process.env.PRIVATE_KEY);
      req.user = verify;
      next();
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  isAdmin: async (req, res, next) => {
    const checkUserTypeQry = path.join(__dirname, '../../sql/User/isAdmin.sql');

    const checkUserType = await executeQuery(checkUserTypeQry, {
      userId: req.user.userId,
    });

    if (checkUserType.length > 0) {
      next();
    } else {
      return res
        .status(StatusCodes.OK)
        .send(getResponse(0, message.ACCESS_DENIED, {}));
    }
  },
};
