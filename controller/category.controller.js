
const categoryModel = require("../model/category.model");
const { apiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asynHandler");
const slugify = require ('slugify');
const fs = require ("fs");
const path = require ("path");

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

exports.deleteCategoryController = asyncHandler (async(req, res)=>{
    const {slug} = req.params;
    const findCategory = await categoryModel.findOneAndDelete ({slug});


      if(findCategory){
            const folderpath = path.join (__dirname, "../uploads")
            const filepath = findCategory.image.split ("/").pop();
    
            fs.unlink(`${folderpath}/${filepath}`,(err)=>{
                if(err){
                    apiResponse(res,500, err.message)
                }else{
                    apiResponse(res, 200, "category deleted")
                }
            })
        }else{
            apiResponse(res, 400, "category not found")
        }
})

exports.getAllCategoryController = asyncHandler(async (req, res) =>{
    const categories = await categoryModel.find ({}).select("name slug image");

    apiResponse(res, 200, "category fetch successfull", categories)
})