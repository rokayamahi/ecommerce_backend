require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT ||5000;
const {dbConfig} = require ("./config/db");
const { globalErrorHandler } = require("./utils/globalErrorHandler");

//db connect
dbConfig();

app.use(express.json())

app.use("/", require("./route"))
app.use(globalErrorHandler)



app.listen(port, ()=>{
    console.log(`server is running...port no ${port}`)
})