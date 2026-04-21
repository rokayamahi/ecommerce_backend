const { decode } = require("jsonwebtoken");
const bannerModel = require ("../model/banner.model")
const {apiResponse} = require("../utils/apiResponse")
const { asyncHandler } = require("../utils/asynHandler");
const fs = require("fs");
const path = require("path");

exports.addBannerController =asyncHandler (async(req, res) =>{

    const {filename} = req.file;
    const {isActive} = req.body;
    const banner = new bannerModel({
        image :`${process.env.SERVER_URL}/${filename}`,
        isActive,
    })

    await banner.save();
    apiResponse(res, 200, "banner added successfully")
})


exports.findAllBannerController = asyncHandler(async (req, res) =>{
    const banner = await bannerModel.find ({});

    apiResponse(res, 200, "banner created successfully", banner)
})

exports.deleteBannerController = asyncHandler(async (req, res) =>{
    const {id} = req.params
    const findBanner =await bannerModel.findOne ({_id:id});
    if(findBanner){
        const folderpath = path.join (__dirname, "../uploads")
        const filepath = findBanner.image.split ("/").pop();

        fs.unlink(`${folderpath}/${filepath}`,(err)=>{
            if(err){
                apiResponse(res,500, err.message || "something went wrong")
            }else{
                apiResponse(res, 200, "banner deleted")
            }
        })
    }else{
        apiResponse(res, 400, "banner not found")
    }

         
})

exports.getAllBannersController = asyncHandler(async (req, res) =>{
    const banners = await bannerModel.find ({})

    apiResponse(res, 200, "banner fetch successfull", banners)
})

exports.updateBannerController = asyncHandler(async (req, res) =>{
    const {id} = req.params;
    const image = req.body;
    const {isActive} = req.body;
    const findBanner = await bannerModel.findOne ({_id:id});

    if(findBanner){
        const folderpath = path.join (__dirname, "../uploads")
        const filepath = findBanner.image.split ("/").pop();

        fs.unlink(`${folderpath}/${filepath}`, async(err)=>{
            if(err){
                apiResponse(res,500, err.message)
            }else{
                findBanner.image =`${process.env.SERVER_URL}/${req.file.filename}`
                if (isActive){
                    findBanner.isActive = isActive;
                }
                await findBanner.save()

                apiResponse (res, 200, "banner update", findBanner)
            }
        })
    }else{
        apiResponse(res, 400, "banner not found")
    }
})