const mongoose= require("mongoose");

const userSchema= mongoose.Schema({
    fullName:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        trim:true
    }},
{timestamps:true});

userSchema.set("toJSON",{
    transform(doc,ret){
    delete ret.password;
    delete ret._id;
    delete ret.__v;
}})

const userDBMongo=mongoose.model("User",userSchema);

module.exports=userDBMongo;