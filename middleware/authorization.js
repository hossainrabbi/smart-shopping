const User = require('../model/User');
const error = require('../utils/error');

const authorization = (roles) => async (req, res, next) => {
  let user = req.user;
  try {
    user = await User.findById(user._id);
    if (!user.roles.includes(roles.find((role) => role))) {
      throw error('unauthorize', 403);
    }

    next();
  } catch (err) {
    res.status(403).json({ message: 'unauthorize' });
  }
};

module.exports = authorization;
