 const express = require("express")
 const app = express()
 const path = require("path");
 const cookieParser= require("cookie-parser")
const cors = require("cors")

 if(process.env.NODE_ENV !== 'production') {   
     require("dotenv").config({path:"backend/imp/imp.env"})
 }
 //using midleware
 app.use(cors())
 app.use(express.json({limit:"50mb"}))
 app.use(express.urlencoded({limit:"50mb",extended:true}))
 app.use(cookieParser())

 // importing routes
 const post = require("./routes/post")
 const user = require("./routes/user")

 //using routes
 app.use("/api/v1",post)
 app.use("/api/v1",user)


//  app.use(express.static(path.join(__dirname, "../frontend/build")));


//  app.get("*", (req, res) => {
//    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
//  });




 module.exports = app