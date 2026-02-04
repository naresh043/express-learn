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
  password: {
    type: String,
    required: true,
  },
});


const UserModel=  mongoose.models.User || mongoose.model("User", userSchema);

module.exports=UserModel;