const mongoose = require("mongoose");
const uuidv4 = require("uuid/v4");
const crypto = require("crypto")
const Schema = mongoose.Schema;

var userSchema = new Schema({
    username : {
        type: String,
        required : true,
        trim : true,
        unique: true
    },
    name : {
        type: String,
        required : true,
        trim : true
    },
    salt : String,
    encryp_password : {
        type : String 
    },
    weight : Number,
    age : Number,
    height : Number,
    medicines : [{
      type : mongoose.Types.ObjectId,
      ref : "Medicine"
    }]
});

userSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv4();
    this.encryp_password = this.securePassword(password);
  })
  .get(function() {
    return this._password;
  });

userSchema.methods = {
  autheticate: function(plainpassword) {
    return this.securePassword(plainpassword) === this.encryp_password;
  },

  securePassword: function(plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};


module.exports = mongoose.model("User",userSchema);
