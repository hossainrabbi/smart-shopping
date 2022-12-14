const { model, Schema } = require('mongoose');

const orderSchema = new Schema(
  {
    paymentId: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    purchasedProduct: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    address: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phoneNo: {
        type: String,
        required: true,
        min: [10, 'type a valid number'],
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      division: {
        type: String,
        required: true,
      },
      upozilla: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Delivered'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Order', orderSchema);
