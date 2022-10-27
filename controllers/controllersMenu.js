const BaseError = require('../utills/baseError');
const mongoose = require('mongoose');
const Menu = require('../models/Menu');

const createMenu = async (req, res, next) => {
  try {
    const menu = await Menu.create({ name: req.body.name });

    res.status(201).json({ menu });
  } catch (err) {
    next(err);
  }
};

const getMenuById = async (req, res, next) => {
  try {
    const params = req.params.id;
    Menu.checkParamsId(params);

    if (!mongoose.Types.ObjectId.isValid(params)) {
      throw new BaseError('Menu id is not valid', 404);
    }

    const menu = await Menu.findById(params).populate({
      path: 'items',
      populate: {
        path: 'item',
        model: 'Item',
      },
    });

    if (!menu) {
      throw new BaseError('menu does not exist', 404);
    }
    res.status(200).json({ menu });
  } catch (err) {
    next(err);
  }
};

const getAllMenus = async (req, res, next) => {
  try {
    const menus = await Menu.find({}, { __v: 0 });
    res.status(200).json({ menus });
  } catch (err) {
    next(err);
  }
};

const addItemToMenu = async (req, res, next) => {
  try {
    const params = req.params.id;
    Menu.checkParamsId(params);

    const menu = await Menu.findById(params);
    if (!menu) {
      throw new Error('Menu id not found', 404);
    }

    const data = await Menu.getItemsForMenu(...req.body.items);

    const message = await menu.saveItemsToMenu(data);

    res.status(201).json({
      menu,
      message:
        message.length > 0 ? `${message}: already in menu; not added` : null,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createMenu, addItemToMenu, getMenuById, getAllMenus };
