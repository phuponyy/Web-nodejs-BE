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
