
const categoryModel = require("../model/category.model");
const { apiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asynHandler");
const slugify = require ('slugify')

exports.addCategoryController = asyncHandler (async(req, res)=>{
    const {name} =req.body;
    const {filename} = req.file;

    const slug = slugify(name, {
  replacement: '-',
  remove: undefined,
  lower: true,
  strict: false,
  locale: 'vi', 
  trim: true 
})

    const addCategory = await categoryModel.create({
        name,
        image: `${process.env.SERVER_URL}/${filename}`,
        slug,
    })
    apiResponse(res, 201, "category created", addCategory)
})