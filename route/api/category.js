const express = require ("express");
const multer = require("multer");
const { authorize } = require("../../middleware/Authorize");
const { authorizeRole } = require("../../middleware/AuthorizeRole");
const { addCategoryController } = require("../../controller/category.controller");
const upload = require ("../../utils/upload")
const router = express.Router();

router.post ("/add-category", authorize, authorizeRole("admin"), upload.single("category-image"), addCategoryController)

module.exports = router;
