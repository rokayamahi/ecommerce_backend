const express = require("express");
const { registrationController, loginController, otpVerifyController, resendOtpController } = require("../../controller/auth.controller");
const router = express.Router()



router.post("/registration", registrationController)

router.post("/login", loginController)

router.post("/otp-verify", otpVerifyController)

router.post("/resend-otp", resendOtpController)

module.exports = router;