const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
    require: true,
  },
});


const UserMOdel= new mongoose.model("user",userSchema)

module.exports=UserMOdel;