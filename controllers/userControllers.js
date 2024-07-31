const mongoose = require("mongoose");
const userDBMongo = require("../models/MongoDB/user.js");
const {validations}=require("../Functions/validationsUser.js");
const {encrypt , decrypt}=require("../Functions/encrypt.js");
const {generateJWT}=require("../services/jwt.js");

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
};
async function registerUser(req, res) {
    const isValidOperation=validations(req,res)

      if(!isValidOperation){
        return res.status(400).json({ success: false, message: "Invalid fields" });
      }
    const {fullName, email,rol}=req.body;
    
    try {
        const password = await encrypt(req.body.password);
        const data= {fullName, email,password,rol};
        const newUser= new userDBMongo(data);
        newUser.save();
        return res.status(200).json({ success: true, message: "User registered successfully",data:newUser });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error registering user", error: error.message });
    }
    
};
async function updateUser(req,res){
    const {emailQuery}= req.query;
    if(!emailQuery){
        return res.status(400).json({success: false, message: "Missing email query params"});
    }
    const isValidOperation=validations(req,res);
    if(!isValidOperation){
        return res.status(400).json({success: false, message: "Invalid fields"});
    }
    const lowerCaseMailQuery=emailQuery.toLowerCase();
    const searchRol= await userDBMongo.findOne({ email: lowerCaseMailQuery });
    if(searchRol.length==0){
        return res.status(404).json({ success: false, message: "User not found "});
    }else{
        if(searchRol.rol==='admin'){
            try {
                const {fullName,email, rol}=req.body;
                const lowerCaseMailRol=rol.toLowerCase();
                if(lowerCaseMailRol!='admin'&& lowerCaseMailRol!='user'){
                    return res.status(404).json({ success: false, message: "The role entered is not correct (Admin/User)"});
                };
                const data={fullName, email, rol};
                const updateUser = await userDBMongo.findOneAndUpdate({ email: data.email},data,{ new: true });    
                if (!updateUser) {
                    return res.status(404).json({ success: false, message: "User not found"});
                } else {
                    return res.status(200).json({ success: true, message: "User found and updated", data: updateUser}); 
            }} catch (error) {
                return res.status(500).json({ success: false, message: "Error searching for user", error: error.message });
            }
        } else{
            return res.status(400).json({ success: false, message: "Your role does not allow you to generate these changes"});
        }   
    }
};
async function deleteUser(req,res){
    const {emailQuery}= req.query;
    if(!emailQuery){
        return res.status(400).json({success: false, message: "Missing email query params"});
    }
    const isValidOperation=validations(req,res);
    if(!isValidOperation){
        return res.status(400).json({success: false, message: "Invalid fields"});
    }
    const lowerCaseMailQuery=emailQuery.toLowerCase();
    const searchRol= await userDBMongo.findOne({ email: lowerCaseMailQuery });
    if(searchRol.length==0){
        return res.status(404).json({ success: false, message: "User not found "});
    }else{
        if(searchRol.rol==='admin'){
            try {
                const {email}=req.body;
                const deleteUser = await userDBMongo.findOneAndDelete({ email: email });    
                if (!deleteUser) {
                    return res.status(404).json({ success: false, message: "User not found"});
                } else {
                    return res.status(200).json({ success: true, message: "User found and Deleted", data: deleteUser}); 
            }} catch (error) {
                return res.status(500).json({ success: false, message: "Error searching for user", error: error.message });
            }
        } else{
            return res.status(400).json({ success: false, message: "Your role does not allow you to generate these changes"});
        }   
    }
};

module.exports = { loginUser, registerUser,updateUser, deleteUser  };