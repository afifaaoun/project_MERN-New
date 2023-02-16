const jwt= require('jsonwebtoken');
const userSchema= require('../model/UserModel')

exports.IsAuthorized= async(req,res,next)=>{
    try{
        const token= req.header('authorization')
        const decoded=jwt.verify(token,process.env.Private_key)
        console.log(decoded);
        if(!decoded){
            return res.status(404).json({message:"you're not authorized to be here"})
        }
        const user= await userSchema.findById(decoded.id);
        console.log(user);
        req.user =user;
        next();
    }
    catch{
        res.status(500).json({message:"you're not allowed to sign in"})
        
    }
}

//installation pour l'authetification
// npm i bcrypt
// npm i express-validator
// npm jsonwebtoken