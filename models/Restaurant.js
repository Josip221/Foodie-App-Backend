const mongoose = require('mongoose');
const BaseError = require('../utills/baseError');
const Menu = require('./Menu');

const RestaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    default: null,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  menus: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Menu',
    },
  ],
});

RestaurantSchema.statics.checkParamsId = function (id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BaseError('Restaurant id is not valid', 404);
  }
};

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;
