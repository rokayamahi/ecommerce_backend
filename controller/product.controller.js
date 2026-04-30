const productModel = require("../model/product.model");
const { apiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asynHandler");
const { slug } = require("../utils/slug");

const path = require("path");
const fs = require("fs");

exports.addproductController = asyncHandler(async (req, res) => {
  let slugvalue = slug(req.body.title);

  let sku = slugvalue + "-" + Math.floor(Math.random() * 10000);

  let images = req.files.map((item) => {
    return `${process.env.SERVER_URL}/${item.filename}`;
  });

  const addproduct = await productModel.create({
    ...req.body,
    slug: slugvalue,
    images,
    sku,
  });
  apiResponse(res, 201, "product created", addproduct);
});

exports.deleteProductController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await productModel.findByIdAndDelete({ _id: id });

  deleteProduct.images.map((item) => {
    const folderpath = path.join(__dirname, "../uploads");
    const filepath = item.split("/").pop();

    fs.unlink(`${folderpath}/${filepath}`, (err) => {
     return console.log(err);
    });

  });
  apiResponse(res, 200, "product deleted");
});

exports.updateProductController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body || {};

  const findproduct = await productModel.findById(id);

  if (findproduct) {
    if (req.file) {
      const folderpath = path.join(__dirname, "../../uploads");
      const filename = findproduct.image.split("/").pop();

      const fullPath = path.join(folderpath, filename)
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
      const newFileName = req.file ? req.file.filename : req.files.filename;
      findproduct.image = `${process.env.SERVER_URL}/${newFileName}`;
    }
    if (isActive !== undefined) {
      findproduct.isActive = isActive;
    }

    await findproduct.save();
    return apiResponse(res, 200, "product updated", findproduct);

  } else {
    return apiResponse(res, 404, "product not found");
  }
});
