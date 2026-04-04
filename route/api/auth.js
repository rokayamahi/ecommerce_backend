const express = require("express");
const { registrationController, loginController, otpVerifyController, resendOtpController, forgetPasswordController, resetPasswordController } = require("../../controller/auth.controller");
const router = express.Router()



router.post("/registration", registrationController)

router.post("/login", loginController)

router.post("/otp-verify", otpVerifyController)

router.post("/resend-otp", resendOtpController)

router.post("/forget-password", forgetPasswordController)

router.post("/reset-password", resetPasswordController)

module.exports = router;