const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  brand: String,
  sku: String,
  weight: Number,
  warrantyInformation: String,
  shippingInformation: String,
  availabilityStatus: String,
  returnPolicy: String,
  thumbnail: String,
  deleted: Boolean,
  position: Number,
  deletedAt: Date,
  restoredAt: Date,
});

const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;
