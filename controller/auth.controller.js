const { sendEmail } = require("../helpers/sendEmail")
const userModel = require("../model/user.model")
const { apiResponse } = require("../utils/apiResponse")
const { asyncHandler } = require("../utils/asynHandler")
const bcrypt = require("bcrypt")
const otpGenerator = require("otp-generator")
const jwt = require("jsonwebtoken")
const bannerModel = require("../model/banner.model")

exports.registrationController = asyncHandler(async (req, res) => {
    const { email, name, password, phone } = req.body


    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
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
    return apiResponse(res, 201, "user created successfully", user)



})

exports.loginController = asyncHandler(async (req, res) => {
    const { email, password } = req.body


    const findUser = await userModel.findOne({ email }).select("+password");
    if (!findUser) {
        return apiResponse(res, 401, "User not found")
    } else {
        const passwordCheck = await bcrypt.compare(password, findUser.password)

        if (passwordCheck) {
            const user = {
                _id: findUser._id,
                email: findUser.email,
                name: findUser.name,
                verified: findUser.verified,
                role: findUser.role,
            }
            const accesstoken = jwt.sign(user, process.env.PRIVATE_KEY, {
                expiresIn: "1h"
            })

            res.cookie("accesstoken", accesstoken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax"
            });
            apiResponse(res, 200, "login successfully", user)

            // req.session.user = user;
            return apiResponse(res, 200, "login successfull", { ...user, accesstoken })
        } else {
            return apiResponse(res, 401, "invalid credintial")
        }
    }
})

exports.otpVerifyController = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    const user = await userModel.findOne({ email })

    if (user?.verified) {
        return apiResponse(res, 200, "you are verified")
    } else {

        if (!user) {
            return apiResponse(res, 404, "user not found")
        } else {
            if (user.otpexpire < new Date()) {
                apiResponse(res, 400, "OTP time is expire")
            } else {
                if (user.otp == otp) {
                    user.verified = true,
                        user.otp = null,
                        user.otpexpire = null,
                        await user.save()
                    apiResponse(res, 200, "You are varified now")
                } else {
                    apiResponse(res, 200, "OTP not match")
                }
            }
        }
    }


})

exports.resendOtpController = asyncHandler(async (req, res) => {
    const { email } = req.body
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
    const user = await userModel.findOne({ email })

    user.otp = otp;
    user.otpexpire = Date.now() + 5 * 60 * 1000;

    await user.save(email, otp)
    sendEmail(email, otp, "verify");

    apiResponse(res, 200, "Otp resend your email address")
})

exports.forgetPasswordController = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
    const user = await userModel.findOne({ email });

    sendEmail(email, otp, "forget");

    user.forgetPasswordToken = otp;
    await user.save();
    apiResponse(res, 200, "forget password otp send successfully")
})

exports.resetPasswordController = asyncHandler(async (req, res) => {
    const { email, otp, newpassword } = req.body;
    const user = await userModel.findOne({ email })

    if (!user) {
        apiResponse(res, 404, "user not found")
    } else {
        if (otp == user.forgetPasswordToken) {
            let hashPassword = await bcrypt.hash(newpassword, 10)
            user.password = hashPassword,
                await user.save()
            apiResponse(res, 200, "passsword reset done")
        } else {
            apiResponse(res, 401, "invalid otp! please try again")
        }
    }
})

exports.allUsersController = asyncHandler(async (req, res) => {
    console.log(req.headers.cookie)
    const users = await userModel.find({}).select("-otp -otpexpire")
    apiResponse(res, 200, "users fetch successfully", users)
})

