const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const authCheak = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return res
        .status(200)
        .json({ message: "token is not proveded or invalid" });
    }
    // console.log(process.env.JWT_SECRET_KEY,token)
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
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
    res.send({ message: "token is expired or invalid token!", error });
  }
};

const authorizationCheak = (...roles) => {
  console.log("hwlooooooo")
  return async (req, res,next) => {
    const { _id } = req.userId;
    console.log(_id)
    const user = await UserModel.findById(_id).select(["name", "role"]);
    if (user) {
       if(roles.includes(user.role)){
        next()
       }else{
        res.status(401).json({message:"access denied !"})
       }
    }else{
      return res.status(404).json({ message: "User Not Fround !" });
    }


  };
};

module.exports = { authCheak, authorizationCheak };
