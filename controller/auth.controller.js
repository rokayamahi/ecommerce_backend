const { sendEmail } = require("../helpers/sendEmail")
const userModel = require("../model/user.model")
const { apiResponse } = require("../utils/apiResponse")
const { asyncHandler } = require("../utils/asynHandler")
const bcrypt = require("bcrypt")
const otpGenerator = require("otp-generator")

exports.registrationController = asyncHandler(async (req, res) => {
    const { email, name, password, phone } = req.body


    const otp = otpGenerator.generate(6, { upperCaseAlphabets: true, specialChars: true });
    // hash your password
    const hashpassword = await bcrypt.hash(password, 10)
    const user = new userModel({
        email,
        name,
        password: hashpassword,
        phone,
        otp,
        otpexpire: Date.now() + 5 * 60 * 1000
    })

    await user.save()
    sendEmail(email, otp);
    apiResponse(res, 201, "user created successfully", user)



}) 

exports.loginController = asyncHandler (async(req, res)=>{
    const {email, password} = req.body


    const findUser = await userModel.findOne({email}).select("+password");
    if(!findUser){
        apiResponse(res,401, "User not found")
    }else{
        const passwordCheck =await bcrypt.compare(password, findUser.password)
        if(passwordCheck){
            const user ={
                _id: findUser._id,
                email: findUser.email,
                name: findUser.name,
                varified: findUser.varified,
                role: findUser.role,
            }
            apiResponse(res,200,"login successfull", user)
        }else{
            apiResponse(res,401, "invalid credintial")
        }
    }
})


