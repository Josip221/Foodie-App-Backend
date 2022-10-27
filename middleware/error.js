const BaseError = require('../utills/baseError');
const colors = require('colors');

const logError = (err, req, res, next) => {
  console.log('Error'.red, err.message);

  if (err.moreInfo) {
    console.log(err);
  }
  next(err);
};

const returnError = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({ message: err.message });
};

const isOperationalError = err => {
  if (err instanceof BaseError) {
    return err.isOperational;
  }
  return false;
};

module.exports = {
  logError,
  returnError,
  isOperationalError,
};
