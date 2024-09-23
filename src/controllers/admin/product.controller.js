const Product = require("../../models/product.model");
const fillterStatusHelper = require("../../helpers/fillterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
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

  //NOTE: Pagination
  const countProduct = await Product.countDocuments(find);

  let maxPagesToShow = 5;
  let halfPagesToShow = Math.floor(maxPagesToShow / 2);

  let objectPagination = paginationHelper(
    {
      limitItems: 7,
      currentPage: 1,
      totalPage: 0,
      startPage: 1,
      endPage: 1,
    },
    req.query,
    halfPagesToShow,
    maxPagesToShow,
    countProduct
  );

  //End: Pagination

  const products = await Product.find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  res.render("admin/pages/products", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    fillterStatus: fillterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};
