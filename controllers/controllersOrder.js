const Order = require('../models/Order');
const Chatroom = require('../models/Chatroom');
const baseError = require('../utills/baseError');
const mongoose = require('mongoose');

const createOrder = async (req, res, next) => {
  try {
    const order = new Order({ ...req.body });
    order.customer = req.user.user_id;
    //hard coded courier fix later
    const courierID = mongoose.Types.ObjectId('636558082e1547c6a241b80c');
    order.courier = courierID;

    const participants = [];
    participants.push(req.user.user_id, courierID);

    if (!(await Chatroom.exists({ participants }))) {
      const chatroom = new Chatroom({
        participants,
      });
      order.chatroom = chatroom._id;
      console.log(chatroom);
      //chatroom.save();
    } else {
      console.log('Chatroom already exists');
    }
    console.log(order);
    //order.save();
    res.status(200).json({ order });
  } catch (err) {
    next(err);
  }
};

module.exports = { createOrder };
