const path = require('path')
const express = require("express")
require('dotenv').config()
const app = express()
const cors = require("cors")
const bodyParser = require('body-parser')
const cookieParse = require('cookie-parser')
const port = process.env.PORT || 3000
const connectDB = require('./src/db/index.js')


// 
app.use(cookieParse())
app.use(bodyParser.json())
// Page Home
app.get("/", (req, res) => {
    res.send('SERVER ON')
})

connectDB.connect(function(){
    console.log("Connected!");
});
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
// ZingMp3Router
const ZingMp3Router = require("./src/routes/ZingRouter")
app.use("/api", cors(corsOptions), ZingMp3Router)

// Page Error
app.get("*", (req, res) => {
    res.send("Nhập Sai Đường Dẫn! Vui Lòng Nhập Lại >.<")
});

app.listen(port, () => {
    console.log(`Start server listen at http://localhost:${port}`)
});
