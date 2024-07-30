const bcrypt = require("bcrypt");
//medida de aleatoridad que tiene el encrypt, 10 es el valor por defecto
const saltRounds=10;

async function encrypt(password){
    const hashedPassword= await bcrypt.hash(password,saltRounds)
    return hashedPassword;
};
async function decrypt(password,hashedPassword){
    const isValidOperation= await bcrypt.compare(password, hashedPassword)
    return isValidOperation;
};


module.exports={encrypt, decrypt};