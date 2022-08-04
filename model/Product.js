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
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    description: {
      type: String,
      required: [true, 'product description is required'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Product', productSchema);
