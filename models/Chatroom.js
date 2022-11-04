const mongoose = require('mongoose');

const ChatroomSchema = mongoose.Schema({
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      default: {},
    },
  ],
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: ' User',
      default: {},
    },
  ],
});

const Chatroom = mongoose.model('Chatroom', ChatroomSchema);

module.exports = Chatroom;
