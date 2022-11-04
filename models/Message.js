const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
  message: {
    type: String,
    default: 'This is a message',
  },
  createdAt: {
    type: Date,
  },
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
