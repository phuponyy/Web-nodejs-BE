const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const productCategorySchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    parent_id: {
      type: String,
      default: "",
    },
    thumbnail: String,
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    position: Number,
    deletedAt: Date,
    restoredAt: Date,
    status: String,
  },
  {
    timestamps: true,
  }
);

const ProductCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema,
  "products-category"
);

module.exports = ProductCategory;
