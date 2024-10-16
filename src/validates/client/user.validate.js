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
