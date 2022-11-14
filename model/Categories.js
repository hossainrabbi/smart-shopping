const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: [true, 'category name is required'],
      unique: [true, 'category already exist'],
      lowercase: true,
    },
    categoryImage: {
      type: String,
      required: [true, 'category image is required'],
    },
  },
  { timestamps: true }
);

module.exports = model('Categories', categorySchema);
