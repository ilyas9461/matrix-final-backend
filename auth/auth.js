const jwt = require('jsonwebtoken')

//it is a middleware for a authorization. We can use which is protected route in the project.
const verifyJWT = (req, res, next) => {
    const token = req.cookies.token;
    console.log('verifyJWT:', token);

    if (!token) {
        return res.status(401).send({ message: 'Token is missing' })
    }    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded) next() 
        else res.status(401).send({ message: 'Invalid or expired token' })
            
    } catch (err) {
        res.status(401).send({ message: 'Invalid or expired token' })
    }
}

module.exports = verifyJWT