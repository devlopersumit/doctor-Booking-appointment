const jwt = require('jsonwebtoken');

const userAuth = async (req, res, next) => {
    const token  = req.cookies.jwtToken;
    try {

        if(!token) return res.status(401).json({
            success:false,
            message:'Token is missing'
        });
         
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'authentication Issue' + error.message
        })
    }
}

module.exports = userAuth;