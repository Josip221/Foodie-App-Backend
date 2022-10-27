const jwt = require('jsonwebtoken');
const BaseError = require('../utills/baseError');

const authJWT = (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
    if (token.length < 10) {
      throw new BaseError('Missing jwt token for authentication', 403);
    }
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;

  next();
};

module.exports = authJWT;
