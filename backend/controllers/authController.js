const inputValidator = require("../helpers/validation");
const bcrypt = require('bcryptjs');
const User = require("../models/User");
const jwt = require('jsonwebtoken');


//Signup
const signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        inputValidator(name, email, password, role);

        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({ success: false, message: 'User already exist' });
        }

        const newUser = await User.create({
            name,
            email,
            password,
            role
        });

        const token = jwt.sign({id:newUser._id, email }, process.env.SECRET_KEY);

        res.cookie("jwtToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000
        });


        return res.status(201).json({
            success: true,
            message: 'User Registered Successfully',
            user: {
                name, email
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error occured in user creation: ' + error.message
        })
    }

};

//Login
const login = async (req,res) => {
    const{email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).json({
                success:false,
                message:'User not found'
            })
        };

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if(isCorrectPassword === false) {
            return res.status(401).json({
                success:false,
                message:'Invalid Credentials'
            })
        }

        const token = jwt.sign({id:user._id, email }, process.env.SECRET_KEY);

        res.cookie("jwtToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: 'Login Successfully',
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Login Failed'+ error.message
        })
    }
};

//Logout
const logout = (req, res) => {
    res.clearCookie('jwtToken');
    return res.status(200).json({
        success:true,
        message:'Logged out succesfully'
    });
};

//profile
const userProfile = async (req, res) => {
    try {
        const userInfo = await User.find
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Error Occured in Profile fetching: ' + error.message
        })
    }
};

module.exports = {signup, login, logout};