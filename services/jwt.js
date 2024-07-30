const jwt=require("jsonwebtoken");
const JWT_SECRET=process.env.JWT_SECRET;

async function generateJWT(user){
	const userForToken={
	fullName:user.fullName,
    email:user.email
	};
    return await jwt.sign(userForToken,JWT_SECRET,{expiresIn: "10min"});
};
async function verifyJWT(req,res, next){
    const authorizationHeader = req.headers?.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not authorized" });
    }
    const token = authorizationHeader.split(" ")[1];
    if(token){
        jwt.verify(token,JWT_SECRET,(err,decoded)=>{
            if(err){
                return res.status(401).json({sucess: false, message: "Invalid or expired token"});
            };
            req.decode=decoded;
            next();
        });
    }else{
        res.status(401).json({success: false, message:"No token provided"});
    }
};

module.exports={generateJWT, verifyJWT}