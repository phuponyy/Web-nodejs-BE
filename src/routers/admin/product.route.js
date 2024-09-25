const express = require("express");
const router = express.Router();
const productController = require("../../controllers/admin/product.controller");

router.get("/", productController.index);

router.patch("/change-status/:status/:id", productController.changeStatus);

router.patch("/change-multi", productController.changeMulti);

router.patch("/delete/:id", productController.deleteItem);

router.get("/trash", productController.trashPage);

router.patch("/trash/restore/:id", productController.restoreItem);

router.delete("/trash/deletef/:id", productController.deletefItem);

module.exports = router;
