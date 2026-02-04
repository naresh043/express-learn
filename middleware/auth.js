const jwt=require("jsonwebtoken");
const UserModel=require("../models/userModel")
const authCheak = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if(!token){
      return res.status(200).json({message:"token is not proveded or invalid"})
    }
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRATE_KEY);
    const user = await UserModel.findOne({ _id: tokenDecoded?._id }).select([
      "-password",
      "-__v",
    ]);
    if (!user) {
      return res.send("user is not fround!");
    }
    req.userId = user._id;
    
    next();
  } catch (error) {
    if (error.message === "jwt expired") {
      return res.send("token is expired or invalid token!");
    }
    console.log(error);
    res.send(error);
  }
};

module.exports = authCheak;
