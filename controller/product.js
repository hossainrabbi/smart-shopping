const mongoose = require('mongoose');
const uploadImages = require('../config/cloudinary');
const error = require('../utils/error');
const Product = require('../model/Product');
const isValidHttpUrl = require('../utils/isValidHttpUrl');

exports.getAllProduct = async (_req, res, next) => {
  try {
    const product = await Product.find();

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

exports.getSingleProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw error('product not found', 404);
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw error('product not found', 404);
    }

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
    featured,
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
      featured: featured || false,
      images: imageResult,
    });

    product = await product.save();
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  const { productId } = req.params;

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
    let product = await Product.findById(productId);
    if (!product) throw error('product not found', 404);

    const imageResult = [];
    for (let i = 0; i < images.length; i++) {
      if (isValidHttpUrl(images[i])) {
        imageResult.push(images[i]);
      } else {
        const result = await uploadImages(images[i]);
        imageResult.push(result.url);
      }
    }

    if (imageResult.length <= 0) throw error('Images upload fail', 400);

    product = await Product.findByIdAndUpdate(
      productId,
      {
        productName,
        price,
        inStock,
        discount,
        category,
        images: imageResult,
        description,
      },
      { new: true }
    );

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
