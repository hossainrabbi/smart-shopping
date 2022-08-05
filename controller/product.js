const mongoose = require('mongoose');
const uploadImages = require('../config/cloudinary');
const error = require('../utils/error');
const Product = require('../model/Product');

exports.getAllProduct = async (_req, res, next) => {
  try {
    const product = await Product.find();

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  const {
    productName,
    price,
    inStock,
    discount,
    category,
    images,
    description,
  } = req.body;

  try {
    if (
      !productName ||
      !price ||
      !inStock ||
      !category ||
      !description ||
      images.length === 0
    ) {
      throw error('Invalid Credentials', 400);
    }

    const imageResult = [];
    for (let i = 0; i < images.length; i++) {
      const result = await uploadImages(images[i]);
      imageResult.push(result.url);
    }

    if (imageResult.length <= 0) throw error('Images upload fail', 400);

    let product = new Product({
      productName,
      price,
      inStock,
      discount,
      category,
      description,
      images: imageResult,
    });

    product = await product.save();
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw error('product not found', 404);
    }

    const product = await Product.findById(productId);
    if (!product) throw error('product not found', 404);

    await product.remove();
    res.status(203).send();
  } catch (err) {
    next(err);
  }
};
