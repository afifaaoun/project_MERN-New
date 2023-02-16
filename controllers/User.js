const userSchema= require('../model/UserModel');
const tokenSchema= require('../model/TokenModel');
const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');
const crypto= require('crypto');
const clientURL = process.env.CLIENT_URL;
const SendEmail = require("../Email/SendEmail");

//signUp user
exports.signUp= async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const found= await userSchema.findOne({email})
        if(found){
            res.status(400).json({message:'email already exist'})
        }
        const newUser= await new userSchema(req.body);
        const saltRounds=10;
        const salt= bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password,salt);
        newUser.password= hash;
        const payload={id:newUser._id};
        const token= jwt.sign(payload,process.env.Private_key);
        newUser.save();
        res.status(200).json({message:'user created',newUser,token})
    }
    catch(err){
        res.status(500).json({message:'failed to create this user'})
        console.log(err);
    }
}
//get user
exports.getUser=async(req,res)=>{
    try{const users= await userSchema.find()
        res.status(200).json({message:'list of users',users})}
    catch{
        res.status(500).json({message:'error to get users'})
    }    
}
//login user
exports.loginUser=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const exist = await userSchema.findOne({email});
        if (!exist){
            res.status(404).json({message:'this is not the wanted user'})
        }
        //password deja crypt" dc lezem decryptage
        const match= await bcrypt.compare(password,exist.password);
        if(!match){
            return res.status(404).json({message:'wrong password'})
        }
        const payload= {id: exist._id};
        const token=jwt.sign(payload,process.env.Private_key);
        res.status(200).json({message:'welcome',token})
    }
    catch{
        res.status(500).json({message:"you're not authorized to login"})
    }
}
//requestPasswordReset
exports.requestPasswordReset= async (email) => {
    const user = await userSchema.findOne({ email });
    if (!user) throw new Error("Email does not exist");
  
    let token = await tokenSchema.findOne({ userId: user._id });
    if (token) await token.deleteOne();
  
    let resetToken = crypto.randomBytes(32).toString("hex");
    const saltRounds=10;
    const salt= bcrypt.genSaltSync(saltRounds);
    const hash = await bcrypt.hash(resetToken, Number(salt));
  
    await new tokenSchema({
      userId: user._id,
      token: hash,
      createdAt: Date.now(),
    }).save();
  
    const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;
  
    SendEmail(
      user.email,
      "Password Reset Request",
      {
        name: user.name,
        link: link,
      },
      "./template/requestResetPassword.handlebars"
    );
    return { link };
  };
  //resetPassword
  exports.resetPassword = async (userId, token, password) => {
    let passwordResetToken = await tokenSchema.findOne({ userId });
    if (!passwordResetToken) {
        throw new Error("Invalid or expired password reset token");
    }
    console.log(passwordResetToken.token, token);
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid){
        throw new Error('Invalid or expired password reset token');
    }
    const saltRounds=10;
    const salt= bcrypt.genSaltSync(saltRounds);
    const hash = await bcrypt.hash(password, Number(salt));
  
    await userSchema.updateOne(
      { _id: userId },
      { $set: { password: hash } },
      { new: true }
    );
  
    const user = await userSchema.findById({ _id: userId });
  
    SendEmail(
      user.email,
      "Password Reset Successfully",
      {
        name: user.name,
      },
      "./template/resetPassword.handlebars"
    );
  
    await passwordResetToken.deleteOne();
  
    return { message: "Password reset was successful" };
  };