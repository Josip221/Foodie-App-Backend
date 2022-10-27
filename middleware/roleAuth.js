const BaseError = require('../utills/baseError');
const colors = require('colors');
const User = require('../models/User');
const mongoose = require('mongoose');

const roleAuth = (...permitedRoles) => {
  return (req, res, next) => {
    const user_id = req.user.user_id;
    let user;
    User.findById(mongoose.Types.ObjectId(user_id), (err, data) => {
      if (err) return next(err);
      user = data;
      if (user && permitedRoles.includes(user.role)) {
        next();
      } else {
        res
          .status(403)
          .json({
            message: `${user.role} role is not authorized for this action`,
          });
      }
    });
  };
};

module.exports = roleAuth;
