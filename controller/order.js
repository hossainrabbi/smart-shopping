const Order = require('../model/Order');
const error = require('../utils/error');

exports.postOrder = async (req, res, next) => {
  const { paymentId, totalPrice, purchasedProduct, address } = req.body;

  try {
    if (
      !paymentId ||
      !totalPrice ||
      !purchasedProduct ||
      purchasedProduct.length === 0 ||
      !address
    ) {
      throw error('Invalid Credentials', 400);
    }

    let order = new Order({
      paymentId,
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
