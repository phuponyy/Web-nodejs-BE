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

  const productNew = await Product.find({
    deleted: false,
    status: "active",
  })
    .sort({ position: "desc" })
    .limit(6);

  const newProductNew = productHelper.priceNewProducts(productNew);

  res.render("client/pages/home/", {
    pageTitle: "Trang Chủ",
    productsFeautured: newProduct,
    productNew: newProductNew,
  });
};
