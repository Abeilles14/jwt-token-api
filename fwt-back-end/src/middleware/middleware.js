jwt = require('jsonwebtoken');
const config = require('../config/config');
const middleware = require('./src/middleware/middleware');

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token) { }
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
}


if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.json({
                success: false,
                message: 'Token is not valid'
            });
        } else {
            req.decoded = decoded;
            next();
        }
    });
} else {
    return res.json({
        success: false,
        message: 'Auth token is not supplied'
    });
};

//update to following app routes to
//App routes
app.use("/api/auth", authRoutes);
app.use("/api/users", middleware.checkToken, userRoutes);

module.exports = {
    checkToken: checkToken
}