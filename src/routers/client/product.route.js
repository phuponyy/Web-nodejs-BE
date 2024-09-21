const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.render("client/pages/products", {
    titlePage: "Dang Sách Sản Phẩm",
  });
});

module.exports = router;
