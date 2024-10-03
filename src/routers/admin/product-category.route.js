const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const validate = require("../../validates/admin/product-category.validate");
const productController = require("../../controllers/admin/product-category.controller");

router.get("/", productController.index);

router.get("/create", productController.create);

router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  productController.createPost
);

router.get("/edit/:id", productController.edit);

router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  productController.editPatch
);

module.exports = router;
