const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: [true, 'category name is required'],
      unique: [true, 'category already exist'],
    },
  },
  { timestamps: true }
);

module.exports = model('Categories', categorySchema);
