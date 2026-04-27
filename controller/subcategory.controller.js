const categoryModel = require("../model/category.model");
const subCategoryModel = require("../model/subCategory.model");
const { apiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asynHandler");
const slugify = require("slugify");

exports.addSubCategoryController = asyncHandler(async (req, res) => {
  const { name, isActive, category } = req.body;

  if (!req.file) {
    apiResponse(res, 400, "subcategory image is required");
  } else {
    const { filename } = req.file;

    
    const slug = slugify(name, {
      replacement: "-",
      remove: undefined,
      lower: true,
      strict: false,
      locale: "vi",
      trim: true,
    });

    const addSubCategory = await subCategoryModel.create({
      slug,
      name,
      image: `${process.env.SERVER_URL}/${filename}`,
      isActive,
      category,
    });

    let updateCategory = await categoryModel.findByIdAndUpdate(
      category,
      { $push: { subcategory: addSubCategory._id } },
      { new: true },
    );

    apiResponse(res, 201, "subcategory Created", addSubCategory);
  }
});
