const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");
const md5 = require("md5");
const Role = require("../../models/role.model");

//NOTE: [GET] /admin/account
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };
  const records = await Account.find(find).select("-password -token");

  for (const record of records) {
    const role = await Role.findOne({
      _id: record.role_id,
      deleted: false,
    });
    record.role = role;
  }

  res.render("admin/pages/account/index", {
    pageTitle: "Danh sách tài khoản",
    records: records,
  });
};

//NOTE: [GET] /admin/account/create
module.exports.create = async (req, res) => {
  const roles = await Role.find({
    deleted: false,
  });

  res.render("admin/pages/account/create", {
    pageTitle: "Tạo tài khoản",
    roles: roles,
  });
};

module.exports.createPost = async (req, res) => {
  const emailExit = await Account.findOne({
    email: req.body.email,
    deleted: false,
  });

  if (emailExit) {
    req.flash("error", "Email Đã tồn tại");
    res.redirect("back");
  } else {
    req.body.password = md5(req.body.password);
    const record = new Account(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};

//NOTE: [GET] /admin/account/edit
module.exports.edit = async (req, res) => {
  const find = {
    _id: req.params.id,
    deleted: false,
  };

  try {
    const data = await Account.findOne(find);
    const roles = await Role.find({
      deleted: false,
    });

    res.render("admin/pages/account/edit", {
      pageTitle: "Chỉnh sửa tài khoản",
      data: data,
      roles: roles,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};

//NOTE: [PATCH] /admin/account/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  if (req.body.password) {
    req.body.password = md5(req.body.password);
  } else {
    delete req.body.password;
  }
  await Account.updateOne({ _id: id }, req.body);
  res.redirect("back");
};
