const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'username is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: [true, 'email already exist'],
      validate: {
        validator: (value) =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value),
        message: ({ value }) => `Invalid email address: ${value}`,
      },
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      validate: {
        validator: (value) => /(?=.*[!#$%&?^*@~() "])(?=.{6,})/.test(value),
        message: () =>
          `Password must contain a letter, number, special character, and at least 6 characters`,
      },
    },
    avatar: {
      type: String,
      default:
        'https://i.ibb.co/HH1JBB4/default-user-avatar-smart-shopping.jpg',
    },
    roles: {
      type: [String],
      default: 'USER',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.getSignToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = model('User', userSchema);
