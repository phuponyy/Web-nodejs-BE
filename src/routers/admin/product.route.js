const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const validate = require("../../validates/admin/product.validate");

const productController = require("../../controllers/admin/product.controller");

router.get("/", productController.index);

router.patch("/change-status/:status/:id", productController.changeStatus);

router.patch("/change-multi", productController.changeMulti);

router.get("/edit/:id", productController.editProduct);

router.patch("/delete/:id", productController.deleteItem);

router.get("/trash", productController.trashPage);

router.patch("/trash/restore/:id", productController.restoreItem);

router.delete("/trash/deletef/:id", productController.deletefItem);

router.get("/create", productController.create);

router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  productController.createPost
);

router.get("/detail/:id", uploadCloud.upload, productController.detail);

router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  productController.editPatch
);

module.exports = router;
