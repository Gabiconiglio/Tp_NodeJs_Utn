const mongoose= require("mongoose");

const userSchema= mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    rol:{
        type:String,
        required:true,
        trim:true
    }},
{timestamps:true});

userSchema.pre('save', function(next) {
    if (this.rol) {
        this.rol = this.rol.toLowerCase();
    }
    if (this.email) {
        this.email = this.email.toLowerCase();
    }
    next();
});

userSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();
    if (update.rol) {
        update.rol = update.rol.toLowerCase();
    }
    if (update.email) {
        update.email = update.email.toLowerCase();
    } 
    next();
});

userSchema.set("toJSON",{
    transform(doc,ret){
    delete ret.password;
    delete ret._id;
    delete ret.__v;
}})

const userDBMongo=mongoose.model("User",userSchema);

module.exports=userDBMongo;