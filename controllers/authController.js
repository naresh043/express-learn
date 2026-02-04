const UserMOdel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken")
const signUp = async (req, res) => {
  try {
    const { name, age, password } = req.body;
    console.log(name, age, password);
    const hashedPassword = await bcrypt.hashSync(password, 12);
    const exitedUser = await UserMOdel.findOne({ name });
    if (exitedUser) {
      res.send("user already existed");
    }
    const user = await UserMOdel({ name, age, password: hashedPassword });
    await user.save();
    res.status(200).json({ message: "user successfully signUp", user: user });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
const login = async (req, res) => {
  const {name,password}=req.body;
  const user=await UserMOdel.findOne({name});
  const isCorrectPassword=await bcrypt.compareSync(password,user?.password);
  console.log({isCorrectPassword,user});
  if(name===user?.name && !isCorrectPassword){
    return  res.send("invalid username or password")
  }
  console.log(process.env.JWT_SECRATE_KEY)
  jwt.sign(user._id,)
  res.status(200).json({message:"login successful"})
};
const me = (req, res) => {
  res.send("Tis is the me api Up api ");
};

module.exports = { signUp, login, me };
