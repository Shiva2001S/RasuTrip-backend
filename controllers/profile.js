const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    const data = await User.find({ email: email, password: password });

    if (!data) {
        return res.status(404).json({
            message: "Invalid credentials"
        })
    }

    if (data[0].email == email && data[0].password == password) {
        console.log('secret key is ', process.env.secretKey);

        const token = jwt.sign({ email, password }, process.env.secretKey, { expiresIn: "1d" })
        console.log(token);

        return res.status(200).json({
            message: "successfull",
            token
        })
    }

    return res.status(404).json({
        message: "Please enter your correct email and password"
    })
}

module.exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({
        name,
        email,
        password
    })

    const data = await newUser.save();

    return res.status(200).json({
        message: "successfull",
        data
    })
}

module.exports.getData = async (req, res) => {
    const { email, password } = req.user;
    const data = await User.find({ email, password });

    return res.status(200).json({
        message: "successfull",
        data
    })
}

module.exports.updatePassword = async (req, res) => {
    const user = req.user;
    
    const data = await User.updateOne({ email: user.email }, {name : req.body.name, email : req.body.email, password : req.body.newPassword});

    return res.status(200).json({
        message: "successful",
        data
    })
}

