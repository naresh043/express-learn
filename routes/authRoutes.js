const express = require("express");
const route = express.Router();
const { login, signUp, me, profileEdit } = require("../controllers/authController");
const authCheck = require("../middleware/auth");

route.post("/login", login);
route.post("/signup", signUp);
route.get("/me", authCheck, me);
route.put("/profile-edit", authCheck, profileEdit);

module.exports = route;
