const md5 = require("md5");
const User = require("../../models/users.model");
const generate = require("../../helpers/generate");
const ForgotPassword = require("../../models/forgot-password.model");

module.exports.register = (req, res) => {
  res.render("client/pages/account/register", {
    pageTitle: "Tài khoản",
  });
};

//NOTE: [POST] /account/register
module.exports.registerPost = async (req, res) => {
  const existEmail = await User.findOne({
    email: req.body.email,
  });

  if (existEmail) {
    console.log("error", "Email đã đăng ký");
    res.redirect("back");
    return;
  }

  req.body.password = md5(req.body.password);

  const user = new User(req.body);
  await user.save();

  res.cookie("tokenUser", user.tokenUser);

  res.redirect("/");
};

//NOTE: [get] /account/register
module.exports.login = async (req, res) => {
  res.render("client/pages/account/login", {
    pageTitle: "Tài khoản",
  });
};

//NOTE: [POST] /account/login
module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, deleted: false });

    if (!user) {
      req.flash("error", "Tài khoản hoặc mật khẩu sai");
      return res.redirect("back");
    }

    if (md5(password) !== user.password) {
      req.flash("error", "Sai mật khẩu");
      return res.redirect("back");
    }

    if (user.status === "inactive") {
      req.flash("error", "Tài khoản đã bị khóa");
      return res.redirect("back");
    }

    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/");
  } catch (error) {
    console.error("Login error:", error); // Log the error for debugging
    req.flash("error", "Đã có lỗi xảy ra, vui lòng thử lại"); // General error message
    res.redirect("back");
  }
};

//NOTE: [POST] /account/logout
module.exports.logout = (req, res) => {
  res.clearCookie("tokenUser");
  res.redirect("/");
};

//NOTE: [GET] /acount/password/forgot
module.exports.forgotPassword = (req, res) => {
  res.render("client/pages/account/forgot-password", {
    pageTitle: "Quên mặt khẩu",
  });
};

//NOTE: [POST] /acount/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email;

  const user = User.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    res.flash("error", "Email không tồn tại");
    res.redirect("back");
    return;
  }

  const objectForgotPassword = {
    email: email,
    otp: generate.generateRandomNumber(8),
    expireAt: Date.now(),
  };

  const forgotPassword = new ForgotPassword(objectForgotPassword);
  await forgotPassword.save();

  res.send("ok");
};
