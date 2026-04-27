const express = require ("express");
const multer = require("multer");
const { authorize } = require("../../middleware/Authorize");
const { authorizeRole } = require("../../middleware/AuthorizeRole");
const { addSubCategoryController } = require("../../controller/subcategory.controller");
const router = express.Router();
const upload = require ("../../utils/upload")

router.post ("/add-subcategory", authorize, authorizeRole("admin"), upload.single("subcategory-image"), addSubCategoryController)



module.exports = router;