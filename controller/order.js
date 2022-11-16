const Order = require('../model/Order');
const error = require('../utils/error');

exports.postOrder = async (req, res, next) => {
  const { paymentId, userId, totalPrice, purchasedProduct, address } = req.body;

  try {
    if (
      !paymentId ||
      !userId ||
      !totalPrice ||
      !purchasedProduct ||
      purchasedProduct.length === 0 ||
      !address
    ) {
      throw error('Invalid Credentials', 400);
    }

    let order = new Order({
      paymentId,
      userId,
      totalPrice,
      purchasedProduct,
      address,
    });

    order = await order.save();
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.find();
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};
