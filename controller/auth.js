const User = require('../model/User');
const error = require('../utils/error');

exports.registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password)
      throw error('invalid credentials', 400);

    let user = await User.findOne({ email });
    if (user) throw error('user already exist', 400);

    user = new User({ username, email, password });
    await user.save();

    const token = user.getSignToken();

    const payload = {
      _id: user._doc._id,
      username: user._doc.username,
      email: user._doc.email,
      avatar: user._doc.avatar,
      roles: user._doc.roles,
    };

    res.status(201).json({
      token,
      user: payload,
    });
  } catch (err) {
    next(err);
  }
};
