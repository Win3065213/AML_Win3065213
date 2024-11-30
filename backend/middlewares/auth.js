const jwt = require('jsonwebtoken');

exports.verifyToken = (requiredRole = null) => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        // console.log(authHeader)
        // console.log(typeof token)
        if (token == null)
            return res.sendStatus(401);
    
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err)
                return res.sendStatus(403)
            req.user = user

            if (requiredRole && (!user.role || user.role !== requiredRole)) {
                return res.status(403).json({ message: "Insufficient role privileges" });
            }

            next()
        })
    };
}