const userModel = require("../model/user.model")
const { apiResponse } = require("../utils/apiResponse")
const { asyncHandler } = require("../utils/asynHandler")
const bcrypt = require("bcrypt")

exports.registrationController =asyncHandler(async (req, res)=> {
    const{email, name, password, phone} = req.body


    // hash your password
    const hashpassword = await bcrypt.hash (password, 12)
    const user = new userModel ({
        email,
        name,
        password: hashpassword,
        phone,
    })

    await user.save()

    apiResponse (res,201, "user created successfully", user)

    

})


