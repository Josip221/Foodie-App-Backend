const Order = require('../models/Order');
const baseError = require('../utills/baseError');
const mongoose = require('mongoose');

const createOrder = async (req, res, next) => {
  try {
    const order = new Order({ ...req.body });
    order.customer = req.user.user_id;
    //hard coded courier fix later
    order.courier = mongoose.Types.ObjectId('636558082e1547c6a241b80c');
    order.save();
    res.status(200).json({ order });
  } catch (err) {
    next(err);
  }
};

module.exports = { createOrder };
