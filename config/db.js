const{default: mongoose} = require("mongoose")

exports.dbConfig = ()=> {
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("database is connected")
    }).catch((err)=>{
        console.error(err.message)
    })
}