const express = require("express");
const { addproductController, deleteProductController, updateProductController } = require("../../controller/product.controller");
const { authorize } = require("../../middleware/Authorize");
const { authorizeRole } = require("../../middleware/AuthorizeRole");
const upload = require("../../utils/upload");
const router = express.Router();


router.post("/add-product", authorize, authorizeRole("admin"), upload.array("product-images") ,addproductController);

router.delete("/delete-product/:id", authorize, authorizeRole("admin"), deleteProductController);

router.patch("/update-product/:id", authorize, authorizeRole("admin"), upload.array("product-images"),updateProductController);


module.exports = router;