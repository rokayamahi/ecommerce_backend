const {apiResponse} = require ("../utils/apiResponse")


exports.authorizeRole = (...role)=>{
    return (req, res, next)=>{
        const {role} = req.user
        let accessrole = role.split(",")
        let access = accessrole.includes(req.user.role)
        if(role == "admin"){
            next()
        }else{
            apiResponse(res, 401, "only admin can access this route")
        }
        // const access = req.user.safeData.role;
        // if (role.includes(access)){
        //     next();
        // }else{
        //     apiResponse(res, 401, "access denied")
        // }
    }
}