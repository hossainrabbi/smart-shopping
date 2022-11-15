const mongoose = require('mongoose');
const User = require('../model/User');
const error = require('../utils/error');

exports.getAllUsers = async (_req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

exports.removeUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw error('user not found', 404);
    }
    const user = await User.findById(userId);
    if (!user) {
      throw error('user not found', 404);
    }

    if (user._id.valueOf() === req.user._id.valueOf()) {
      throw error('you cannot remove your id', 403);
    }

    await user.remove();
    res.status(203).send();
  } catch (err) {
    next(err);
  }
};
