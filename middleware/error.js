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

module.exports = {
  logError,
  returnError,
};
