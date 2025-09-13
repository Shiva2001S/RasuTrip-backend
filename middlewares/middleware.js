const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports.auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('authHeader ', authHeader);
    

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(403).json({
            message : "No token provided"
        })
    }
    
    const token = authHeader.split(" ")[1];

    console.log('token ',token);
    

    const decoded = jwt.verify(token, process.env.secretKey);
    
    req.user = decoded;
    next();
}
