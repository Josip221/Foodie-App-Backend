const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: 'No description',
  },
  picture: {
    type: String,
    default: null,
  },
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
