const express = require("express");
const route = express.Router();
const { login, signUp, me } = require("../controllers/authController");

route.post("/login", login);
route.post("/signUp", signUp);
route.get("/me", me);

module.exports = route;
