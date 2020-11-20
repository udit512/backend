const User = require("../models/user");
var jwt = require("jsonwebtoken");



// sign in 
exports.signup = (req, res) => {
  const user = new User(req.body);
  console.log(user);
  user.save((err, user) => {
    console.log(user);
    if (err) {
      console.log(err);
      return res.status(400).json({
        err: "NOT able to save user in DB"
      });
    }
    res.json({user});
  });
};



// login

exports.login = (req, res) => {
 
  const username = req.body.username;
  const password = req.body.password;


  User.findOne({ username }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER email does not exists"
      });
    }

    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match"
      });
    }

    //sending token and stuff
    return res.json(user);
  });
};



// get all user information
exports.allUserInfo = (req,res) => {
    const userId  = req.body.userId;

    User.findById(userId)
    .populate("medicines")
    .exec((err, user) => {
      if (err) {
        return res.status(400).json({
          error: "NO order found in DB"
        });
      }
      res.json(user);
    });
};