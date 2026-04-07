require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 5000;
const { dbConfig } = require("./config/db");
const { globalErrorHandler } = require("./utils/globalErrorHandler");
const session = require('express-session')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//db connect
app.use(session({
    secret: process.env.PRIVATE_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 360000, 
        httpOnly: true,
        secure: false,
    }
}));
dbConfig();


app.use("/", require("./route"))
app.use(globalErrorHandler)




app.listen(port, () => {
    console.log(`server is running...port no ${port}`)
})