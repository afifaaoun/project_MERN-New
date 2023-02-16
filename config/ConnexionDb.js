const mongoose= require("mongoose");
const dotenv= require('dotenv').config();
const URI= process.env.Mongo_URI;


const ConnectDb=async()=>{
    try{
        await mongoose.connect(URI,{useNewUrlParser:true,useUnifiedTopology:true});
        console.log('Successfully connected to database!');
    }
    catch(err){
        console.log(err);
    }
}


module.exports= ConnectDb