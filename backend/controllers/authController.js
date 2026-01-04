const inputValidator = require("../helpers/validation");
const bcrypt =  require('bcryptjs');
const User = require("../models/User");


//User Registration
const signup = async (req, res) => {
    const {name, email, password, role} = req.body;

   try {
     inputValidator(name, email, password, role);

    const user = await User.findOne(email);
    if(user) {
      return res.status(400).json({success:false, message:'User already exist'});
    }

    const newUser = await User.create({
        name,
         email, 
        password,
         role
    });

    return res.status(201).json({
        success:true,
        message:'User Created Successfully',
        user: {
            name, email
        }
    })

   } catch (error) {
    return res.status(500).json({
        success:false,
        message:'Error occured in user creation: ' + error.message
    })
   }

}