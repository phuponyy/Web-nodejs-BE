const md5 = require("md5");
const User = require("../../models/users.model");
const generate = require("../../helpers/generate");
const ForgotPassword = require("../../models/forgot-password.model");
const sendMailHelper = require("../../helpers/sendMail");
const Cart = require("../../models/cart.model");

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

    const cart = await Cart.findOne({
      user_id: user.id,
    });

    if (cart) {
      res.cookie("cartId", cart._id);
    } else {
      await Cart.updateOne(
        { _id: req.cookies.cartId },
        {
          user_id: user.id,
        }
      );
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
  res.clearCookie("cartId");
  res.redirect("/");
};

//NOTE: [GET] /acount/password/forgot
module.exports.forgotPassword = (req, res) => {
  res.render("client/pages/account/forgot-password", {
    pageTitle: "Quên mật khẩu",
  });
};

//NOTE: [POST] /acount/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({
      email: email,
      deleted: false,
    });

    if (!user) {
      req.flash("error", "Email không tồn tại");
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

    // Send mail
    const subject = "Mã OTP xác nhận lại mật khẩu";
    const html = `
      Mã OTP để lấy lại mật khẩu là: <b style="color: red;">${objectForgotPassword.otp}</b>. Thời hạn sử dụng là 3 phút.
    `;

    sendMailHelper.sendMail(email, subject, html);

    res.redirect(`/account/password/otp?email=${email}`);
  } catch (error) {
    console.log("error:", error);
    res.redirect("back");
  }
};

//NOTE: [GET] /acount/password/otp
module.exports.otpPassword = (req, res) => {
  const email = req.query.email;

  res.render("client/pages/account/otp-password", {
    pageTitle: "Quản lý mật khẩu",
    email: email,
  });
};

//NOTE: [POST] /acount/password/otp
module.exports.otpPasswordPost = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;

  const result = await ForgotPassword.findOne({
    email: email,
    otp: otp,
  });

  if (!result) {
    req.flash("error", "OTP không hợp lệ!");
    res.redirect("back");
    return;
  }

  const user = await User.findOne({
    email: email,
  });

  res.cookie("tokenUser", user.tokenUser);

  res.redirect("/account/password/reset");
};

//NOTE: [GET] /acount/password/reset
module.exports.resetPassword = (req, res) => {
  res.render("client/pages/account/reset-password", {
    pageTitle: "Đặt lại mật khẩu",
  });
};

//NOTE: [POST] /acount/password/reset
module.exports.resetPasswordPost = async (req, res) => {
  const password = req.body.password;
  const tokenUser = req.cookies.tokenUser;

  await User.updateOne(
    {
      tokenUser: tokenUser,
    },
    {
      password: md5(password),
    }
  );

  res.redirect("/");
};

//NOTE: [GET] /acount/info
module.exports.info = async (req, res) => {
  const tokenUser = req.cookies.tokenUser;

  const infoUser = await User.findOne({
    tokenUser: tokenUser,
  }).select("-password");

  res.render("client/pages/account/info", {
    pageTitle: "Thông tin tài khoản",
    infoUser: infoUser,
  });
};
