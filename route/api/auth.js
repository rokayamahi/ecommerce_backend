const express = require("express");
const { registrationController, loginController } = require("../../controller/auth.controller");
const router = express.Router()



router.post("/registration", registrationController)

router.post("/login", loginController)

module.exports = router;