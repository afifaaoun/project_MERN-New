const express=require('express');
const ConnectDb = require('../../project_MERN/backend/config/ConnexionDb');
const bookRouter= require('../../project_MERN/backend/routes/BookRoutes');
const userRouter= require('../../project_MERN/backend/routes/UserRoutes');

const app=express();
const port=5008;
const cors= require('cors');

ConnectDb();
app.use(express.json());
app.use(cors(
    {    
        origin:["http://localhost:3000"],
        method:["GET","POST"],
        credentials:true
    }
));
app.use('/admin',bookRouter);
app.use('/users',userRouter)




app.listen(port,(err)=>{
    err?
    console.err('err')
    :
    console.log(`server is running in port : ${port}`);
})