const mongoose = require("mongoose");
const userDBMongo = require("../models/MongoDB/user.js");
const {validations}=require("../Functions/validationsUser.js");
const {encrypt , decrypt}=require("../Functions/encrypt.js");
const {generateJWT}=require("../services/jwt.js");



async function registerUser(req, res) {
    const isValidOperation=validations(req,res)

      if(!isValidOperation){
        return res.status(400).json({ success: false, message: "Invalid fields" });
      }
    const {fullName, email}=req.body;
    
    try {
        const password = await encrypt(req.body.password);
        const data= {fullName, email,password};
        const newUser= new userDBMongo(data);
        newUser.save();
        return res.status(200).json({ success: true, message: "User registered successfully",data:newUser });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error registering user", error: error.message });
    }
    
}

async function loginUser(req, res) {
    const isValidOperation=validations(req,res)

    if(!isValidOperation){
      return res.status(400).json({ success: false, message: "Invalid fields" });
    }
    
    const user= await userDBMongo.find().where({email: req.body.email});
    if(!user.length){
        //Sale porque no encuentra mail
    return res.status(401).json({ success: false, message: "Error in email or password" });
    }
    const hashedPassword=user[0].password;
    try {
        const match= await decrypt(req.body.password,hashedPassword);
        if(!match){
            //Sale por contraseña erronea
            return res.status(404).json({ success: false, message: "Error in email or password"});  
        }
        const token= await generateJWT(user[0]);
        return res.status(200).json({ success: true, message: "User logged in",data:token });   
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error loguin user", error: error.message});
    }
}

module.exports = { registerUser, loginUser };