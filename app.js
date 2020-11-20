require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
var jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userAuth = require("./routers/userAuth");
const bmi = require("./routers/bmi");
const medRoutes = require("./routers/medicine");




mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser : true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        autoIndex: true,
        useFindAndModify: false
    }
).then(() => {
    console.log("DB CONNECTED");
})

const app = express();

app.use(cookieParser());
app.use(express.json());


app.use("/",userAuth);
app.use("/",bmi);
app.use("/",medRoutes);

app.get("/testing",(req,res)=>{
    res.send("working");
});

//server listening on some port 
app.listen(process.env.PORT,() => {
    console.log(`App running at ${process.env.PORT} ....`)
})