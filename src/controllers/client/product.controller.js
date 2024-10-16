const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");

const productHelper = require("../../helpers/product");
const productCategoryHelper = require("../../helpers/products-category");

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
      slug: req.params.slugProduct,
    };

    const product = await Product.findOne(find);

    if (product.product_category_id) {
      const category = await ProductCategory.findOne({
        deleted: false,
        status: "active",
        _id: product.product_category_id,
      });

      product.category = category;
    }

    product.priceNew = productHelper.priceNewProduct(product);

    res.render("client/pages/products/detail", {
      pageTitle: "Chi tiết sản phẩm",
      product: product,
    });
  } catch (error) {
    res.redirect(`/products`);
    console.log(error);
  }
};

module.exports.category = async (req, res) => {
  const category = await ProductCategory.findOne({
    deleted: false,
    status: "active",
    slug: req.params.slugCategory,
  });

  const listSubCategory = await productCategoryHelper.getSubCategory(
    category.id
  );

  const listSubCategoryId = listSubCategory.map((item) => item.id);

  const products = await Product.find({
    product_category_id: { $in: [category.id, ...listSubCategoryId] },
  }).sort({ position: "desc" });

  const newProduct = productHelper.priceNewProducts(products);

  res.render("client/pages/products", {
    pageTitle: category.title,
    products: newProduct,
  });
};
