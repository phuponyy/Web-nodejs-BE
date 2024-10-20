const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      default: null,
    },
    products: [
      {
        product_id: String,
        quantity: Number,
      },
    ],
    expireAt: {
      type: Date,
      default: Date.now(),
      expires: 120,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema, "carts");

module.exports = Cart;
