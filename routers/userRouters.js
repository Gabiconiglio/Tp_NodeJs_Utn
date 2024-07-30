const express=require("express");
const userRouters=express.Router();
const { registerController, loginController }=require("../controllers/userControllers.js");

userRouters.post("/register", (req,res)=>res.send(registerController(req,res)));
userRouters.post("/login", (req,res)=>res.send(loginController(req,res)));

module.exports = userRouters;