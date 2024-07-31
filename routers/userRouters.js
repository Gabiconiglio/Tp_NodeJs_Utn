const express=require("express");
const token= require("../services/jwt.js");
const userControllers=require("../controllers/userControllers.js");
const userRouters=express.Router();

userRouters.post("/register", userControllers.registerUser);
userRouters.post("/login", userControllers.loginUser);
userRouters.post("/updateUser/email/",token.verifyJWT, userControllers.updateUser);
userRouters.put("/deleteUser/email/",token.verifyJWT, userControllers.deleteUser);

module.exports = userRouters;