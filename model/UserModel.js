const mongoose= require('mongoose');
const bcrypt= require('bcrypt');

const userSchema= new mongoose.Schema({
    name: String,
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    //role: {
    //   type: String,
    //   default: "user"
    // }

});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const bcryptSalt=10;
  const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
  this.password = hash;
  next();
});  

  
module.exports= mongoose.model('user',userSchema);