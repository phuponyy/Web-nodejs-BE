const md5 = require("md5");
const Account = require("../../models/account.model");

module.exports.index = async (req, res) => {
  res.render("admin/pages/my-account/index", {
    pageTitle: "Trang cá nhân",
  });
};

module.exports.edit = async (req, res) => {
  res.render("admin/pages/my-account/edit", {
    pageTitle: "Chỉnh sửa thông tin cá nhân",
  });
};

module.exports.editPatch = async (req, res) => {
  const id = res.locals.user.id;

  const emailExit = await Account.findOne({
    _id: { $ne: id },
    email: req.body.email,
    deleted: false,
  });

  if (emailExit) {
    console.log("error", `Email ${req.body.email} đã tồn tại!`);
  } else {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }
    await Account.updateOne({ _id: id }, req.body);
  }
  res.redirect("back");
};
