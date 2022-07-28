const User = require('../model/User');
const error = require('../utils/error');

// Register User
exports.registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password)
      throw error('invalid credentials', 400);

    let user = await User.findOne({ email });
    if (user) throw error('user already exist', 400);

    user = new User({ username, email, password });
    await user.save();

    res.status(201).json(resTokenUser(user));
  } catch (err) {
    next(err);
  }
};

// Login User
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) throw error('invalid credentials', 400);

    let user = await User.findOne({ email });
    if (!user) throw error('invalid credentials', 400);

    const isMatch = await user.comparePasswordMatch(password);
    if (!isMatch) throw error('invalid credentials', 400);

    res.status(200).json(resTokenUser(user));
  } catch (err) {
    next(err);
  }
};

// Take user and return user with token
const resTokenUser = (user) => {
  const token = user.getSignToken();
  const payload = {
    _id: user._doc._id,
    username: user._doc.username,
    email: user._doc.email,
    avatar: user._doc.avatar,
    roles: user._doc.roles,
  };

  return {
    token,
    user: payload,
  };
};
