const express = require("express");
const {
  addBannerController,
  getAllBannersController,
  updateBannerController,
} = require("../../controller/banner.controller");
const { authorize } = require("../../middleware/Authorize");
const { authorizeRole } = require("../../middleware/AuthorizeRole.js");
const router = express.Router();
const multer = require("multer");
const {
  findAllBannerController,
  deleteBannerController,
} = require("../../controller/banner.controller.js");
const upload = multer({ dest: "uploads/" });

//add-banner
router.post(
  "/add-banner",
  authorize,
  // authorizeRole,
  upload.single("banner-image"),
  addBannerController,
);

//all-banner
router.get("all-banner", findAllBannerController);

//delete-banner
router.delete(
  "/delete-banner/:id",
  authorize,
  authorizeRole("admin", "editor"),
  deleteBannerController,
);

router.get("/banners", getAllBannersController);

//update-banner
router.patch("/update-banner/:id", authorize, authorizeRole("admin"), upload.single("banner-image"), updateBannerController)

module.exports = router;
