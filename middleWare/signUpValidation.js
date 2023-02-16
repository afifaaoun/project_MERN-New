const {body}= require('express-validator');

exports.signUpValidation=[
    body('email','please enter a valid email').isEmail(),
    body('password','password mmust contain at least 6 characters').isLength({min:6}),
]
exports.validation=(req,res,next)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    next()
}