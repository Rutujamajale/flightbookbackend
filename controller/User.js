
const User = require('../model/user.model');
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// register the user controller;
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password,role} = req.body;
       
        if (!name || !email || !password|| !role) {
            return res.status(404).json({ message: "All Fields required" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User with this email already exists, please try with another email",
            });
        }

        // check the complexity of password;
        const passwordRegex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long and contain at least one capital letter, one symbol, and one number",
            });
        }

        // hashing the password and saving the user to the database
        bcrypt.hash(password, 10, async function (err, hash) {
            if (err) {
                console.log("Error Occurred: ", err);
                res.status(404).json({
                    message: "Something went wrong while hashing the password",
                });
            } else {
                const newUser = new User({ name, email, password: hash,role, });
                await newUser.save();
                res.status(201).json({ message: "User Registered Successfully", newUser });
            }
        });
    } catch (error) {
        console.log("Error occurred: ", error.message);
        res.status(500).json({ message: "Something went wrong while registering the user" });
    }
};

//log in user controllers
exports.loginUser=async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"user Not found with this mail",error:"user not found"});
        }
        const hashedPassword=user.password;

        bcrypt.compare(password,hashedPassword,async function(err,result){
            if(result){
                const accessToken=jwt.sign(
                    {userId:user._id,userRole:user.role},
                    process.env.secritKey
                );
                res.status(200).json({message:"user Logged in successfully",accessToken});
                
            }
            else{
                console.log(err);
                res.status(404).json({message:"password does not Match"});
            }
        });
       
    }catch(error){
        res.status(500).json({message:"Something want wrong at logging the user",error:error});
    }
    
}

exports.getUserById = async (req, res) => {
    try {
      
      const userId = req.params.id
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    
      res.status(200).json({ message: 'User found', user: user });
    } catch (error) {
      
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
  
      res.status(200).json({ message: 'Users found', users: users });
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };









;
