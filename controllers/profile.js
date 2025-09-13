const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
require('dotenv').config();
module.exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
    
    const data = await User.find({ email: email });

    if (!data) {
        return res.status(404).json({
            message: "Invalid credentials"
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password, data[0].password);

    if (isPasswordCorrect) {
        const token = jwt.sign({ email, password }, process.env.secretKey, { expiresIn: "1d" })

        return res.status(200).json({
            message: "successfull",
            token
        })
    }

    return res.status(404).json({
        message: "Please enter your correct email and password"
    })  
    } catch (error) {
        return res.status(404).json({
            error : error
        })
    }
    
}

module.exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    const ifUser = await User.find({email : email});

    if (ifUser.length > 0) {  
        return res.json({
            message : "User already existed please login with right credentials"
        })
    }

    const hasPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password : hasPassword
    })

    const data = await newUser.save();

    return res.status(200).json({
        message: "successfull",
        data
    })
}

module.exports.getData = async (req, res) => {
    const { email } = req.user;
    const data = await User.find({ email});

    return res.status(200).json({
        message: "successfull",
        data
    })
}

module.exports.updatePassword = async (req, res) => {
    const user = req.user;

    const hashPassword = await bcrypt.hash(req.body.newPassword, 10);
    
    const data = await User.updateOne({ email: user.email }, {name : req.body.name, email : req.body.email, password : hashPassword});

    return res.status(200).json({
        message: "successful",
        data
    })
}

