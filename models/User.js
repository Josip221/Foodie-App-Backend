const mongoose = require('mongoose');
const bcyrpt = require('bcrypt');
const BaseError = require('../utills/baseError');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'carrier', 'owner'],
    default: 'user',
  },
});

UserSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
    this.password = await bcyrpt.hash(this.password, 10);
  }
  next();
});

UserSchema.statics.checkParamsId = function (id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BaseError('User id is not valid', 404);
  }
};

UserSchema.statics.loginUser = async function (email, password) {
  const user = await this.findOne(
    { email },
    { password: 1, name: 1, email: 1 }
  );
  if (!user) {
    throw new BaseError('Invalid credentials', 401);
  }
  const cmp = await bcyrpt.compare(password, user.password);
  if (!cmp) {
    throw new BaseError('Invalid credentials', 401);
  }
  return user;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
