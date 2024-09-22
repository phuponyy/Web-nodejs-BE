const Product = require("../../models/product.model");

// NOTE: [GET] /products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
  });

  const newProduct = products.map((item) => {
    item.priceNew = (
      (item.price * (100 - item.discountPercentage)) /
      100
    ).toFixed(2);
    return item;
  });

  res.render("client/pages/products", {
    pageTitle: "Danh Sách Sản Phẩm",
    products: newProduct,
  });
};
