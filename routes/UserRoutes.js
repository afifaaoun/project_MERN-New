const express=require('express');
const { signUpValidation, validation } = require('../../../project_MERN/backend/middleWare/signUpValidation');
const {signUp, loginUser, getUser} = require('../controllers/User');
const { IsAuthorized } = require('../middleWare/IsAuthorized');
const { resetPasswordRequestController, resetPasswordController } = require('../middleWare/isReseted');
const userRouter=express.Router()

userRouter.post('/login', signUp, signUpValidation, validation )
userRouter.get('/get',getUser);
userRouter.post('/signIn',loginUser);
userRouter.get('/profile', IsAuthorized,(req,res)=>{
    res.send(req.user)
})
userRouter.post("/auth/requestResetPassword", resetPasswordRequestController);
userRouter.post("/auth/resetPassword", resetPasswordController);



module.exports=userRouter;

//IsAuth bch tchouf est ce que l user mezel connecté walla lee si connecté t9ollek rak allowed
//si nn ure not allowed bch tod5l ll site hedheka
//owel step t3ml signIn bl post w b3d profile bl get w tod5l ll header tzidou Authorization
//w tekteb ltoken li 3tahoulek wa9t 3malt l sign in
