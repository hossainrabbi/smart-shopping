const mongoose = require('mongoose');
const User = require('../model/User');
const error = require('../utils/error');

exports.getProfile = (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  const { _id } = req.user;
  const { username, avatar } = req.body;

  try {
    if (!mongoose.isValidObjectId(_id)) {
      throw error('Invalid User', 404);
    }

    const user = await User.findById(_id);
    if (!user) {
      throw error('Invalid User', 404);
    }

    if (username && username !== user.username) {
      user.username = username;
    }

    if (avatar && avatar !== user.avatar) {
      user.avatar = avatar;
    }

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
