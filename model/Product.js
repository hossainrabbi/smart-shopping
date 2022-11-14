const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, 'product name is required'],
    },
    price: {
      type: Number,
      required: [true, 'product price is required'],
    },
    inStock: {
      type: Number,
      required: [true, 'product inStock is required'],
    },
    discount: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, 'product category is required'],
    },
    images: {
      type: [String],
      required: true,
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    description: {
      type: String,
      required: [true, 'product description is required'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    ratting: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    review: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Product', productSchema);
