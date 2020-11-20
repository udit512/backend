const express = require("express");
var bmi = express.Router();
const {postBMI} = require("../controller/bmi")

bmi.post('/BMI',postBMI);
module.exports = bmi;