const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  address: {
    type: 'String',
    default: 'some address doesnt matter',
  },
  courier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  chatroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chatroom',
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
  createdAt: {
    type: Date,
  },
});

OrderSchema.pre('save', function (next) {
  this.createdAt = Date.now();
  next();
});

OrderSchema.statics.checkParamsId = function (id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BaseError('Id is not valid', 404);
  }
};

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
