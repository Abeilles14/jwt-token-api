const UserService = require('./user-service');
const User = require("../models/user");
const userServer = new UserService();
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = class AuthService {
    constructor() { }

    // with services we need asynchronous functions due to the nature of JavaScript runtime environment
    // Look at JavaScript concurrency model for more information

    login(userInput) {
        console.log("inside backend api auth service");
        return new Promise((resolve, reject) => {
            User.findUserByEmailAndPassword([userInput.email, userInput.password], (err, res) => {
                if (err) {
                    reject(err);
                }
                else if (res.length > 0) { // database returns a user or an array larger than length 0
                    console.log("assigning a token");
                    let token = jwt.sign({ email: userInput.email },
                        config.secret,
                        {
                            expiresIn: '24h' // expires in 24 hours
                        }
                    );
                    // return the JWT token for the future API calls
                    console.log("resolving");
                    resolve({
                        success: true,
                        message: 'Authentication successful!',
                        token: token
                    });
                }
                else {
                    reject("user does not exist");
                }
            });
        });
    }

    register(user) {
        let email = user.email;
        // return promise (asynchronous function method)
        // https://developers.google.com/web/fundamentals/primers/promises
        return new Promise((resolve, reject) => {
            userServer.createUser(user).then(userReturned => {
                let token = jwt.sign({ email: email },
                    config.secret,
                    {
                        expiresIn: '24h' // expires in 24 hours
                    }
                );
                // return the JWT token for the future API calls
                resolve({
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                });
            }).catch(err => {
                reject(err); // reject error in promise
            });
        });
    }



}