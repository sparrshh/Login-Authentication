const router=require('express').Router();
const app = require('express');
const User = require('../model/User')
const {regiserValidation, loginValidation} = require('./validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Validation


router.post('/register',async (req,res)=>{
   const {error} = regiserValidation(req.body);
   //Lets validate before
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    //Hash the passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);


    

    
    



   const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword

   });
   try{
  const savedUser = await user.save();
  res.send({user: user_id});
   }
   catch(err)
   {
      res.status(400).send(err);
   }
});

//Login
router.post('/login', async(req,res)=>{
   const {error} = loginValidation(req.body);
   //Lets validate before
    if(error) return res.status(400).send(error.details[0].message);
 //Checking if the email exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('This email doesnt exists');

   //Password in correct
   const validPass = await bcrypt.compare(req.body.password,user.password);
   if(!validPass) return res.status(400).send("Invalid Password");

   //Create and assign a token
   const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
   res.header('auth-token',token).send(token);


   res.send("Logged in");
   

});

module.exports=router;