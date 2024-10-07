const md5 = require("md5");
const Account = require("../../models/account.model");

const systemConfig = require("../../config/system");

//NOTE: [GET] /admin/auth/login
module.exports.login = async (req, res) => {
  const user = await Account.findOne({ token: req.cookies.token }).select(
    "-password"
  );
  if (!user) {
    res.render("admin/pages/auth/login", {
      pageTitle: "Đăng nhập",
    });
  } else {
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
  }
};

//NOTE: [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await Account.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    console.log("Error", "Email không tồn tại!");
    res.redirect("back");
    return;
  }

  if (md5(password) !== user.password) {
    console.log("Error", "Password không tồn tại!");
    res.redirect("back");
    return;
  }

  if (user.status != "active") {
    console.log("Error", "Tài khảon đã bị khoá!");
    res.redirect("back");
    return;
  }

  res.cookie("token", user.token);
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
};

//NOTE: [GET] /admin/auth/logout
module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
};
