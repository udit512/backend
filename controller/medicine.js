const Medicine = require("../models/medicine");
const User = require("../models/user");


// add medicine 
exports.addMedicine = (req,res) => {
    const userId = req.body.userId;
    var medicines = {
        medicine_name:req.body.medicine_name,
        times:req.body.times,
        no_pills: req.body.no_pills
    }
    var med = new Medicine(medicines);
    med.save((err, med) => {
        if (err) {
          return res.status(400).json({
            error: "NOT able to save category in DB"
          });
        }
      });
    User.findOneAndUpdate(
        { _id: userId },
        { $push: {  medicines : med } },
        { new: true },
        (err, medicine) => {
          if (err || !medicine) {
             // console.log(err);
            return res.status(400).json({
              error: "NOT able to save medicine in DB"
            });
          }
          res.send(medicine);
        }
      );
}


// update medicine values 

exports.updateMedicine =  (req,res)=>{
    const userId = req.body.userId;
    User.findById(userId)
    .populate("medicines" , "medicine_name")
    .exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "NOT able to save medicine in DB"});
        }

        for(var i =0 ; i < user.medicines.length ; i++){
            if(user.medicines[i].medicine_name == req.body.current_medicine_name ){
                updateMed(user.medicines[i].medicine_name);
                break;    
            }
        }
        res.send("no such med");
    });

    function updateMed(medName){
        Medicine.findOneAndUpdate({medicine_name : medName},
            {medicine_name:req.body.new_medicine_name,
        times:req.body.times,
        no_pills: req.body.no_pills}
        ,(err,med)=>{
            if(err || !med){
                return res.status(400).json({
                    error: "NOT able to save medicine in DB"});
            }
            res.send(med);
        })
    }
}


// delete medicine values 

exports.deleteMedicine =  (req,res)=>{
    const userId = req.body.userId;
    User.findById(userId)
    .populate("medicines" , "medicine_name")
    .exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "NOT able to save medicine in DB"});
        }

        for(var i =0 ; i < user.medicines.length ; i++){
            if(user.medicines[i].medicine_name == req.body.current_medicine_name ){
                deleteMed(user.medicines[i].medicine_name);
                break;    
            }
        }
        res.send("med not found");
    });

    function deleteMed(medName){
        Medicine.findOneAndDelete({medicine_name : medName}
        ,(err,med)=>{
            if(err || !med){
                return res.status(400).json({
                    error: "NOT able to save medicine in DB"});
            }
            res.send(med);
        })
    }
}



