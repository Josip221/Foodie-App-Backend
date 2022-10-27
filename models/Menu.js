const mongoose = require('mongoose');
const Item = require('./Item');
const BaseError = require('../utills/baseError');

const MenuSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  items: [
    {
      price: {
        type: Number,
        default: 0,
      },
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
      },
    },
  ],
});

MenuSchema.statics.getItemsForMenu = async function (...reqItems) {
  const arr = [...reqItems];

  const items = arr.map(async item => {
    const result = await Item.findOne({ name: item.name });

    return { price: item.price, item: result };
  });

  const data = Promise.all(items);

  return data;
};

MenuSchema.methods.saveItemsToMenu = async function (data) {
  let message = [];
  const thisIdArray = this.items.map(item => item.item.toString());

  data.forEach((el, i) => {
    if (thisIdArray.includes(el.item.id)) {
      console.log(
        `${
          el.item.name[0].toUpperCase() + el.item.name.slice(1)
        } already exists in menu so it was not added`
      );
      message.push(el.item.name);
      delete data[i];
    }
  });
  data.forEach(el => {
    this.items.push({ price: el.price, item: el.item._id });
  });
  this.save();
  return message;
};

MenuSchema.statics.checkParamsId = function (id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BaseError('Menu id is not valid', 404);
  }
};

const Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;
