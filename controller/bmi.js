const User = require("../models/user");


exports.postBMI = (req,res) => {
    
    const userId  = req.body.userId;
    const age = req.body.age;
    const weight = req.body.weight;
    const height = req.body.height;
    User.findOneAndUpdate({ _id: userId },{age:age, weight:weight ,height:height } ,(err, user) => {
        if (err || !user) {
            console.log(err);
          return res.status(400).json({
            error: "USER email does not exists"
          });
        }
    
        return res.send("user has been updated");
      });
};