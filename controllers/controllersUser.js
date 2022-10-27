const User = require('./../models/User');
const bcyrpt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BaseError = require('../utills/baseError');
const mongoose = require('mongoose');

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      throw new BaseError('User already exists', 409);
    }

    const encryptedPassword = await bcyrpt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      {
        user_id: user._id,
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '2h',
      }
    );

    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('password');

    if (!user) {
      throw new BaseError('Invalid credentials', 401);
    }
    const cmp = await bcyrpt.compare(password, user.password);
    if (!cmp) {
      throw new BaseError('Invalid credentials', 401);
    }

    const token = jwt.sign(
      {
        user_id: user._id,
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '2h',
      }
    );

    res.status(200).json({ email, token });
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const params = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(params)) {
      throw new BaseError('Item id is not valid', 404);
    }

    res.status(200).json({});
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { __v: 0 });
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const params = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(params)) {
      throw new BaseError('Item id is not valid', 404);
    }

    const user = await User.findById(params);

    if (!user) {
      throw new BaseError('User not found', 401);
    }

    user.delete();

    res.status(200).json({ message: 'user deleted' });
  } catch (err) {
    next(err);
  }
};

const deleteAllUsers = async (req, res) => {
  await User.deleteMany({});
  res.status(200).send('All users deleted');
};

const checkMe = async (req, res, next) => {
  const { user_id, email } = req.user;
  res.status(200).json({ user: { user_id, email } });
};

module.exports = {
  registerUser,
  deleteUserById,
  deleteAllUsers,
  checkMe,
  loginUser,
  getAllUsers,
  getUserById,
};
