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
      return error('user not found', 404);
    }
    const user = await User.findById(userId);
    if (!user) {
      return error('user not found', 404);
    }

    console.log('RemoveUser', user._id);
    console.log('LoginUser', req.user._id);

    if (user._id === req.user._id) {
      return error('you cannot remove your id', 403);
    }

    await user.remove();
    res.status(203).send();
  } catch (err) {
    next(err);
  }
};
