const express=require("express");
const userRouters=express.Router();
const userControllers=require("../controllers/userControllers.js");

userRouters.post("/register", userControllers.registerUser);
userRouters.post("/login", userControllers.loginUser);

module.exports = userRouters;