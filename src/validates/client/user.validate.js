module.exports.registerPost = (req, res, next) => {
  if (!req.body.fullName) {
    console.log("error", "Vui lòng nhập họ và tên");
    res.redirect("back");
    return;
  }

  if (!req.body.email) {
    console.log("error", "Vui là nhap email");
    res.redirect("back");
    return;
  }

  if (!req.body.password) {
    console.log("error", "Vui là nhap mat khau");
    res.redirect("back");
    return;
  }

  next();
};

module.exports.loginPost = (req, res, next) => {
  if (!req.body.email) {
    console.log("error", "Vui là nhap email");
    res.redirect("back");
    return;
  }

  if (!req.body.password) {
    console.log("error", "Vui là nhap mat khau");
    res.redirect("back");
    return;
  }

  next();
};

module.exports.forgotPasswordPost = (req, res, next) => {
  if (!req.body.email) {
    console.log("error", "Vui là nhap email");
    res.redirect("back");
    return;
  }

  next();
};

module.exports.resetPasswordPost = (req, res, next) => {
  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập mật khẩu");
    res.redirect("back");
    return;
  }

  if (!req.body.confirmPassword) {
    req.flash("error", "Vui lòng nhập xác nhận mật khẩu");
    res.redirect("back");
    return;
  }

  if (req.body.password !== req.body.confirmPassword) {
    req.flash("error", "Mật khẩu không khớp!");
    res.redirect("back");
    return;
  }

  next();
};
