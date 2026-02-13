const express = require("express");
const User = require("../models/user");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();


// @route POST /api/users/register
// @desc Register a new user
// @access Public


router.post("/register", async (req, res) => {
  const { name, email, password , role } = req.body;

  try {
    
    // Registration logic

    let user = await User.findOne({email});

    if (user) return res.status(400).json({message : "User already exists"});
    user = new User({name , email , password , role});
    await user.save();


    // Create JWT Payload

    const payload = {user: {id: user._id, role: user.role}};

    jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : "40h"}, (err,token) => {
      if (err) throw err;

      res.status(201).json({
        user :{
          _id : user._id,
          name : user.name,
          email : user.email,
          role : user.role,
        },
        token
      })

    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});


// @route POST /api/users/login
// @desc Authenticate user
// @access Public


router.post("/login", async (req, res) => {
  const {email, password} = req.body;

  try {
    
    // Find the User by Email

    let user = await User.findOne({email});

    if (!user) return res.status(400).json({message : "Invalid Credentials"});
    const isMatch = await user.matchPassword(password);
    
    if(!isMatch)
      return res.status(400).json({message : "Invalid Credentials"});
    

    // Create JWT Payload

    const payload = {user: {id: user._id, role: user.role}};

    jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : "40h"}, (err,token) => {
      if (err) throw err;

      res.json({
        user :{
          _id : user._id,
          name : user.name,
          email : user.email,
          role : user.role,
        },
        token
      })

    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});


// @route POST /api/users/profile
// @desc Get logged-in 
// @access Private


router.get('/profile', protect , (req , res) => {
  res.json(req.user)
});





module.exports = router;