const jwt = require("jsonwebtoken");
const { apiResponse } = require("../utils/apiResponse");

exports.authorize = (req, res, next)=>{
    console.log (req.cookies.accesstoken)
    const authorization = req.headers.authorization
    if(req.cookies.accesstoken || req.headers && authorization?.startsWith("Bearer")){
        const token = req.cookies.accesstoken ||authorization.split (" ")[1];


        jwt.verify(token, process.env.PRIVATE_KEY, (err,decoded)=>{
            if(err){
                apiResponse(res,500, err.message)
            }else{
                if(decoded.role == "admin"){
                    next()
                }else{
                    apiResponse(res, 401, "access denied")
                }
            }
        });
    }else{
        apiResponse(res, 500, "invalid token type")
    }
        
}
// exports.authorize = (req, res, next)=>{
//     if(req.session.user){
//         next()
//     }else{
//         apiResponse(res, 401, "access denied")
//     }
// }