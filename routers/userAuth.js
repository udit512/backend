const express = require("express");
var userAuth = express.Router();
const {login,signup,addMedicine, allUserInfo} = require("../controller/userAuth");

//signin route
userAuth.post("/login",login);

//signup route 
userAuth.post("/signup",signup);


// to get all users
userAuth.post("/alluserinfo",allUserInfo);

module.exports = userAuth;