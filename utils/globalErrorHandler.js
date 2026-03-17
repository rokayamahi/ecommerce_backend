const { apiResponse } = require("./apiResponse")

exports.globalErrorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(err => err.message);
        return res.status(400).json({ errors });
    } else {
        apiResponse(res, 400, err.message || "something went wrong")
    }
}