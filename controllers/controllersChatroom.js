const Chatroom = require('../models/Chatroom');
const baseError = require('../utills/baseError');

const createChatroom = async (req, res, next) => {
  try {
    const chatroom = new Chatroom({});
    //chatroom.save()
    res.status(201).json({ chatroom });
  } catch (err) {
    //next(err);
  }
};

module.exports = { createChatroom };
