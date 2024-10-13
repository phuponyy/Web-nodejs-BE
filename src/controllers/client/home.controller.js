const Product = require("../../models/product.model");

const productHelper = require("../../helpers/product");

// NOTE: [GET] /
module.exports.index = async (req, res) => {
  const productsFeautured = await Product.find({
    featured: "1",
    deleted: false,
    status: "active",
  }).limit(3);

  const newProduct = productHelper.priceNewProducts(productsFeautured);

  res.render("client/pages/home/", {
    pageTitle: "Trang Chủ",
    productsFeautured: newProduct,
  });
};
