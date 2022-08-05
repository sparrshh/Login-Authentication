const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
dotenv.config();


//Connect database
mongoose.connect(process.env.DB_CONNECT
    ,()=> console.log('connected to db')
);
//Middleware
app.use(express.json());



//Import routes
//Route  middlewares
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);

app.listen(3000,()=>{
console.log("Server up and running")
});