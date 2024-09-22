const Product = require("../../models/product.model");
const fillterStatusHelper = require("../../helpers/fillterStatus");
const searchHelper = require("../../helpers/search");
// NOTE: [GET] /admin/products
module.exports.index = async (req, res) => {
  const fillterStatus = fillterStatusHelper(req.query);

  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  const objectSearch = searchHelper(req.query);

  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  const products = await Product.find(find);

  res.render("admin/pages/products", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    fillterStatus: fillterStatus,
    keyword: objectSearch.keyword,
  });
};
