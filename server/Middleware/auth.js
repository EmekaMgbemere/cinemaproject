const jwt = require('jsonwebtoken');


const routes = function(req, res, next){
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({ msg: "No token , Authorization Denied"});
    }

    try{
        const decoded = jwt.verify(token, process.env.jwtSecret);
        req.user = decoded.user;
        next();
    }
    catch (err){
        res.status(401).json({ msg: "Token is Invalid"});
    }
};

module.exports = routes;
