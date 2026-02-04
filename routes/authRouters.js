const express = require("express");
const route = express.Router();
const { login, signUp, me,profileEdit,getAllUsers } = require("../controllers/authController");
const {authCheak,authorizationCheak}=require("../middleware/auth")

route.post("/login", login);
route.post("/signUp", signUp);
route.get("/me", authCheak,me);
route.put("/profileedit",authCheak,profileEdit)
route.get("/getallusers",authCheak,authorizationCheak("admin"),getAllUsers)

module.exports = route;
