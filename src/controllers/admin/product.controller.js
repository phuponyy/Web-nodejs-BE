const Product = require("../../models/product.model");
const fillterStatusHelper = require("../../helpers/fillterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");

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

  // Sort
  let sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }
  // End Sort

  const products = await Product.find(find)
    .sort(sort)
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

  req.flash("success", "Cập nhật trạng thái thành công!");

  res.redirect("back");
};

// NOTE: [PATCH] /admin/products/change-multi/:status/:id
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ").map((id) => id.trim());

  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deletedAt: new Date() }
      );
      break;
    case "restore-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: false, restoredAt: new Date() }
      );
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne({ _id: id }, { position: position });
      }
      break;
    default:
      break;
  }
  res.redirect("back");
};

//NOTE: [GET] /admin/products/edit/id
module.exports.editProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({ _id: id }).lean();
  res.render("admin/pages/products/edit", {
    pageTitle: "Chi tiết sản phâm",
    product: product,
  });
};

//NOTE: [PATCH] /admin/products/delete/id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  await Product.updateOne(
    { _id: id },
    { deleted: true, deletedAt: new Date() }
  );

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
    .sort({ position: 1 })
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
  const { type, ids } = req.body;
  const id = req.params.id;
  await Product.updateOne(
    { _id: id },
    { deleted: false, restoredAt: new Date() }
  );

  res.redirect("back");
};

//NOTE: [DELETE] /admin/products/trash/deletef/id
module.exports.deletefItem = async (req, res) => {
  const id = req.params.id;

  await Product.deleteOne({ _id: id });

  res.redirect("back");
};

//NOTE: [GET] /admin/products/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create.pug", {
    pageTitle: "Thêm mới sản phẩm",
  });
};

//NOTE: [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  console.log(req.file);
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  if (req.body.position == "") {
    const countProduct = await Product.countDocuments();
    req.body.position = countProduct + 1;
  } else {
    req.body.postion = parseInt(req.body.position);
  }

  const product = new Product(req.body);
  await product.save();

  res.redirect(`${systemConfig.prefixAdmin}/products`);
};

//NOTE: [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };

    const product = await Product.findOne(find);

    // console.log(product);

    res.render("admin/pages/products/detail.pug", {
      pageTitle: "Chi tiết sản phẩm",
      product: product,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};
