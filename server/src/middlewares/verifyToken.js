const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (req, res, next)=>{
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({success: false, message: 'access token not found'})
    }
    try {
        const decoded = jwt.verify(token, process.env.PRIVATEKEY)
        req.username = decoded.username
        next()
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            
        }
        return res.status(403).json({success: false, message: 'invalid token', error})
        
    }
}

module.exports = verifyToken