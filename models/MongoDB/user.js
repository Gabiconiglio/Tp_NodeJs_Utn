const mongoose= require("mongoose");

const userSchema= mongoose.Schema({
    fullName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
});

const userDBMongo=mongoose.model("User",userSchema);

module.exports=userDBMongo;