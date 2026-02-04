const express = require("express");
const route = express.Router();
const { login, signUp, me,profileEdit } = require("../controllers/authController");
const authCheak=require("../middleware/auth")

route.post("/login", login);
route.post("/signUp", signUp);
route.get("/me", authCheak,me);
route.put("/profileedit",authCheak,profileEdit)

module.exports = route;
