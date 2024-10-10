const ProductCategory = require("../../models/product-category.model");
const Product = require("../../models/product.model");
const fillterStatusHelper = require("../../helpers/fillterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree");
const Account = require("../../models/account.model");

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

  for (const product of products) {
    const user = await Account.findOne({
      _id: product.createdBy.account_id,
    });
    if (user) {
      product.accountFullName = user.fullName;
    }

    const updatedBy = product.updatedBy.slice(-1)[0];
    if (updatedBy) {
      const userUpdated = await Account.findOne({
        _id: updatedBy.account_id,
      });

      updatedBy.accountFullName = userUpdated.fullName;
    }
  }

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

  const updated = {
    account_id: res.locals.user.id,
    updateAt: new Date(),
  };

  await Product.updateOne(
    { _id: id },
    { status: status, $push: { updatedBy: updated } }
  );

  req.flash("success", "Cập nhật trạng thái thành công!");

  res.redirect("back");
};

// NOTE: [PATCH] /admin/products/change-multi/:status/:id
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ").map((id) => id.trim());

  const updated = {
    account_id: res.locals.user.id,
    updateAt: new Date(),
  };

  switch (type) {
    case "active":
      await Product.updateMany(
        { _id: { $in: ids } },
        { status: "active", $push: { updatedBy: updated } }
      );
      break;
    case "inactive":
      await Product.updateMany(
        { _id: { $in: ids } },
        { status: "inactive", $push: { updatedBy: updated } }
      );
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
        {
          deleted: false,
          restoredAt: new Date(),
          $push: { updatedBy: updated },
        }
      );
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne(
          { _id: id },
          { position: position, $push: { updatedBy: updated } }
        );
      }
      break;
    default:
      break;
  }
  res.redirect("back");
};

//NOTE: [GET] /admin/products/edit/id
module.exports.editProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id, deleted: false });

    const category = await ProductCategory.find({ deleted: false });
    const newCategory = createTreeHelper.tree(category);
    res.render("admin/pages/products/edit", {
      pageTitle: "Chi tiết sản phẩm",
      product: product,
      category: newCategory,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
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
    .sort({ position: -1 })
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
  const category = await ProductCategory.find({ deleted: false });

  const newCategory = createTreeHelper.tree(category);

  res.render("admin/pages/products/create.pug", {
    pageTitle: "Thêm mới sản phẩm",
    category: newCategory,
  });
};

//NOTE: [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if (req.body.position == "") {
    const countProduct = await Product.countDocuments();
    req.body.position = countProduct + 1;
  } else {
    req.body.postion = parseInt(req.body.position);
  }

  req.body.createdBy = {
    account_id: res.locals.user.id,
  };

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

module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  try {
    const updated = {
      account_id: res.locals.user.id,
      updateAt: new Date(),
    };

    req.body.position = parseInt(req.body.position);
    await Product.updateOne(
      { _id: id },
      {
        ...req.body,
        $push: {
          updatedBy: updated,
        },
      }
    );

    res.redirect(`${systemConfig.prefixAdmin}/products`);
  } catch (error) {
    console.log("error", "Co loi xay ra vui long thu lai");
  }
};
