const jwt = require("jsonwebtoken");
const { apiResponse } = require("../utils/apiResponse");

exports.authorize = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (
        req.cookies.accesstoken ||
        (authorization && authorization.startsWith("Bearer"))
    ) {
        const token =
            req.cookies.accesstoken || authorization.split(" ")[1];

        jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
            if (err) {
                return apiResponse(res, 500, err.message);
            }

            if (decoded.role == "admin") {
               req.user = decoded;
                next();
            } else {
                return apiResponse(res, 401, "access denied");
            }
        });
    } else {
        return apiResponse(res, 401, "invalid token type");
    }
};