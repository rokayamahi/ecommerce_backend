const express = require ("express");
const multer = require("multer");
const { authorize } = require("../../middleware/Authorize");
const { authorizeRole } = require("../../middleware/AuthorizeRole");
const { addCategoryController, deleteCategoryController, getAllCategoryController } = require("../../controller/category.controller");
const upload = require ("../../utils/upload")
const router = express.Router();

router.post ("/add-category", authorize, authorizeRole("admin"), upload.single("category-image"), addCategoryController);

router.delete ("/delete-category/:slug", authorize, authorizeRole("admin"), deleteCategoryController);

router.get("/all-category", getAllCategoryController);

module.exports = router;
