const jwt = require('jsonwebtoken');
const User = require('../model/User');
const error = require('../utils/error');

const authentication = async (req, res, next) => {
  let token = req.headers.authorization;
  try {
    if (!token) throw error('unauthorize', 403);
    token = token.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded._id);
    if (!user) throw error('unauthorize', 403);

    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ message: 'invalid token' });
  }
};

module.exports = authentication;
