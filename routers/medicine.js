const express = require("express");
var medRouter = express.Router();
const {addMedicine,updateMedicine,deleteMedicine} = require("../controller/medicine");


medRouter.post("/addmedicine",addMedicine);


medRouter.post("/updatemedicine",updateMedicine);

medRouter.post("/deletemedicine",deleteMedicine);



module.exports = medRouter;