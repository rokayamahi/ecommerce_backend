const path = require("path")
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '.uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = file.minetype.split("/");
        cb(null, file.fieldname + '-' + uniqueSuffix + "."+ ext [ext.length -1])

    }
})

function checkFileType(file, cb) {
    const filetypes =/jpeg|jpg|png|gif|mp4/;
    const extname = filetypes.test (path.extname (file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extname){
        return cb (null, true)
    }else{
        cb ["error: Images only! (jpeg, jpg, png, gif)"]

        const upload = multer({
            storage: storage,
            limits:{
                fileSize: 5*1024*1024 //5mb
            },
            
            fileFilter: function(req,file,cb){
                checkFileType(file,cb)
            }
        })
    }
}

module.exports = upload;