const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/products-details");

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

module.exports = mongoose.model("Product", productSchema);
