module.exports.index = async (req, res) => {
  res.render("client/pages/chat", {
    pageTitle: "Trang chat",
  });
};
