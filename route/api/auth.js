const express = require("express");
const { registrationController, loginController, otpVerifyController, resendOtpController, forgetPasswordController } = require("../../controller/auth.controller");
const router = express.Router()



router.post("/registration", registrationController)

router.post("/login", loginController)

router.post("/otp-verify", otpVerifyController)

router.post("/resend-otp", resendOtpController)

router.post("/forget-password", forgetPasswordController)

module.exports = router;