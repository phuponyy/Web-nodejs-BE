const Product = require("../../models/product.model");
const fillterStatusHelper = require("../../helpers/fillterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
// NOTE: [GET] /admin/products
module.exports.index = async (req, res) => {
  const fillterStatus = fillterStatusHelper(req.query);

  const nameTitle = {
    restore: "Xoá",
    classBtn: "btn-danger",
  };

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

  let objectPagination = paginationHelper(
    {
      limitItems: 7,
      currentPage: 1,
      totalPage: 0,
      startPage: 1,
      endPage: 1,
    },
    req.query,
    countProduct
  );

  //End: Pagination

  const products = await Product.find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  res.render("admin/pages/products", {
    pageTitle: "Danh sách sản phẩm",
    nameTitle,
    products: products,
    fillterStatus: fillterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
    countProduct: countProduct,
  });
};

// NOTE: [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });

  res.redirect("back");
};

// NOTE: [PATCH] /admin/change-status/:status/:id
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  switch (type) {
    case "active":
      await Product.updateMany({ _id: ids }, { status: "active" });
      break;
    case "inactive":
      await Product.updateMany({ _id: ids }, { status: "inactive" });
      break;

    default:
      break;
  }
  res.redirect("back");
};

//NOTE: [PATCH] /admin/products/delete/id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { deleted: true });

  res.redirect("back");
};

//NOTE: [get] /admin/products/trash
module.exports.trashPage = async (req, res) => {
  const fillterStatus = fillterStatusHelper(req.query);

  let find = {
    deleted: true,
  };

  const nameTitle = {
    restore: "Khôi phục",
    classBtn: "btn-primary",
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

  let objectPagination = paginationHelper(
    {
      limitItems: 7,
      currentPage: 1,
      totalPage: 0,
      startPage: 1,
      endPage: 1,
    },
    req.query,
    countProduct
  );

  //End: Pagination

  const products = await Product.find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  res.render("admin/pages/products/trashpage.pug", {
    pageTitle: "Sản phẩm đã xoá",
    nameTitle,
    products: products,
    fillterStatus: fillterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
    countProduct: countProduct,
  });
};

//NOTE: [PATCH] /admin/products/trash/restore/id
module.exports.restoreItem = async (req, res) => {
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { deleted: false });

  res.redirect("back");
};

//NOTE: [DELETE] /admin/products/trash/deletef/id
module.exports.deletefItem = async (req, res) => {
  const id = req.params.id;

  await Product.deleteOne({ _id: id });

  res.redirect("back");
};
