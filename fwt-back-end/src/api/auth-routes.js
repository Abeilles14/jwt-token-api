const express = require('express');
const router = express.Router();

const AuthService = require('../services/auth-service');

const authServe = new AuthService();

//login
router.post('/login', (req, res) => {
    console.log("in router");
    authServe.login(req.body).then(token => {
        res.json(token);
    }).catch(err => {
        res.json({
            success: false,
            message: err
        });
    });
});


//register
router.post('/register', (req, res) => {
    // asynchronous function call structure 
    authServe.register(req.body).then(user => {
        res.json(user);
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;