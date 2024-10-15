const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // user_id: String,
    cart_id: String,
    user_info: {
      fullName: String,
      phone: String,
      email: String,
      address: String,
      note: String,
    },
    products: [
      {
        product_id: String,
        price: Number,
        quantity: Number,
        discountPercentage: Number,
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema, "orders");

module.exports = Order;
