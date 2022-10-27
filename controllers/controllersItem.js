const BaseError = require('../utills/baseError');
const mongoose = require('mongoose');
const Item = require('../models/Item');

const createItem = async (req, res, next) => {
  try {
    const { name } = req.body;
    const item = await Item.create({ name });
    res.status(201).json({ message: `${item.name} succesfully created` });
  } catch (err) {
    next(err);
  }
};

const getItemById = async (req, res, next) => {
  try {
    const params = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(params)) {
      throw new BaseError('Item id is not valid', 404);
    }
    const item = await Item.findById(params);
    if (!item) {
      throw new BaseError('Item does not exist', 404);
    }
    res.status(200).json({ item });
  } catch (err) {
    next(err);
  }
};

const getAllItems = async (req, res, next) => {
  try {
    const items = await Item.find({}, { __v: 0 });
    res.status(200).json({ items });
  } catch (err) {
    next(err);
  }
};

module.exports = { createItem, getItemById, getAllItems };
