const Product = require("../../models/product.model");

const productHelper = require("../../helpers/product");

// NOTE: [GET] /products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
  }).sort({ position: -1 });

  const newProduct = productHelper.priceNewProducts(products);

  res.render("client/pages/products", {
    pageTitle: "Danh Sách Sản Phẩm",
    products: newProduct,
  });
};

// NOTE: [GET] /products/:slug
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      slug: req.params.slug,
    };

    const product = await Product.findOne(find);

    // console.log(product);

    res.render("client/pages/products/detail", {
      pageTitle: "Chi tiết sản phẩm",
      product: product,
    });
  } catch (error) {
    res.redirect(`/products`);
  }
};
