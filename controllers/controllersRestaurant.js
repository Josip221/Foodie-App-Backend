const Restaurant = require('../models/Restaurant');
const Menu = require('../models/Menu');
const BaseError = require('../utills/baseError');
const mongoose = require('mongoose');

const createRestaurant = async (req, res, next) => {
  try {
    const { name, location } = req.body;
    const restaurant = await Restaurant.create({
      name,
      location,
      owner: req.user.user_id,
    });
    res.status(201).json({ restaurant });
  } catch (err) {
    next(err);
  }
};

const getRestaurantById = async (req, res, next) => {
  try {
    const params = req.params.id;
    Restaurant.checkParamsId(params);

    const restaurant = await Restaurant.findById(params)
      .populate('owner')
      .populate('menus', { items: 0 });
    if (!restaurant) {
      throw new BaseError('Restaurant not found', 404);
    }
    res.status(200).json({ restaurant });
  } catch (err) {
    next(err);
  }
};

const getAllRestaraunts = async (req, res, next) => {
  try {
    const restaraunts = await Restaurant.find({});
    console.log(restaraunts);
    res.status(200).json({ restaraunts });
  } catch (err) {
    next(err);
  }
};

const addMenuToRestaurant = async (req, res, next) => {
  try {
    const params = req.params.id;

    Restaurant.checkParamsId(params);
    const restaurant = await Restaurant.findById(params);
    const menu = await Menu.findOne({ name: req.body.menu });
    if (!restaurant.menus.includes(menu._id)) {
      restaurant.menus.push(menu._id);
      restaurant.save();
      res.status(201).json({ restaurant });
    } else {
      throw new BaseError(
        `${menu.name} is already added to this restaurant`,
        404
      );
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRestaurant,
  getRestaurantById,
  getAllRestaraunts,
  addMenuToRestaurant,
};
