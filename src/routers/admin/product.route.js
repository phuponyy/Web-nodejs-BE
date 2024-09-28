const express = require("express");
const router = express.Router();
const multer = require("multer");
const storageMulter = require("../../helpers/storageMulter");
const upload = multer({ storage: storageMulter() });

const productController = require("../../controllers/admin/product.controller");

router.get("/", productController.index);

router.patch("/change-status/:status/:id", productController.changeStatus);

router.patch("/change-multi", productController.changeMulti);

router.patch("/delete/:id", productController.deleteItem);

router.get("/trash", productController.trashPage);

router.patch("/trash/restore/:id", productController.restoreItem);

router.delete("/trash/deletef/:id", productController.deletefItem);

router.get("/create", productController.create);

router.post(
  "/create",
  upload.single("thumbnail"),
  productController.createPost
);

module.exports = router;
