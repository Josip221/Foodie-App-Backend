class BaseError extends Error {
  constructor(message, statusCode, moreInfo = false) {
    super(message);
    this.statusCode = statusCode;
    this.moreInfo = moreInfo;
  }
}

module.exports = BaseError;
