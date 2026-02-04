const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  role:{
    type:String,
    default:"user"
  },
  password: {
    type: String,
    required: true,
  },
});


const UserModel=  mongoose.models.User || mongoose.model("User", userSchema);

module.exports=UserModel;