module.exports.index = (req, res) => {
  res.render("client/pages/home/", {
    pageTitle: "Trang Chủ",
  });
};
