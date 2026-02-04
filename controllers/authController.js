const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signUp = async (req, res) => {
  try {
    const { name, age, password } = req.body;
    const hashedPassword = await bcrypt.hashSync(password, 12);
    const exitedUser = await UserModel.findOne({ name });
    if (exitedUser) {
      res.send("user already existed");
    }
    const user = await UserModel({ name, age, password: hashedPassword });
    await user.save();
    res.status(200).json({ message: "user successfully signUp", user: user });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await UserModel.findOne({ name });
    const isCorrectPassword = await bcrypt.compareSync(
      password,
      user?.password,
    );
    if (name === user?.name && !isCorrectPassword) {
      return res.send("invalid username or password");
    }
    const token = await jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRATE_KEY,
      { expiresIn: "1h" },
    );
    res.status(200).json({ message: "login successful", token });
  } catch (error) {
    res.send(error);
  }
};
const me = async (req, res) => {
  try {
    console.log(req.userId);
    const user = await UserModel.findById({ _id: req.userId }).select(
      "-password",
    );
    res.status(200).json({ message: "user data fectehed successfully", user });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

const profileEdit = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.userId, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = { signUp, login, me, profileEdit };
