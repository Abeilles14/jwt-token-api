const fs = require("fs");
const User = require("../models/user");

module.exports = class UserService {
    
    constructor() {}

    /*
    findUsers()
    {        
        // return promise (asynchronous function method)
        // https://developers.google.com/web/fundamentals/primers/promises
        return new Promise((resolve, reject) => {        
            fs.readFile("./src/data/data.json", (err,data) => {
                if (err) { reject(err); } // reject error in promise
                else if (data) {
                    let dataParsed = JSON.parse(data);
                    resolve(dataParsed.users); // resolve promise to return value
                }
            });
        });
    }
    */

   findUsers()
   {        
       // return promise (asynchronous function method)
       // https://developers.google.com/web/fundamentals/primers/promises
       return new Promise((resolve, reject) => {        
            User.findAllUsers((err, res) => {
                if (err) {
                reject(err);
                }
                resolve(res);
            });
       });
   }

    findUserById(userId) {
        // return promise (asynchronous function method)
        // https://developers.google.com/web/fundamentals/primers/promises
        return new Promise((resolve, reject) => {  
            fs.readFile("./src/data/data.json", (err,data) => {
                if (err) { reject(err); } // reject error in promise
                else if (data) {
                    let users = JSON.parse(data);
                    const found = users.users.some(user => user.id === userId);
                    if (!found) {
                        reject('User is not registered'); // reject error in promise
                    }  
                    else {
                        resolve(users.users.filter(user => user.id === userId));  // resolve promise to return value
                    }
                }
            });
        });
    }
    /*
    createUser(userReq) {
        // return promise (asynchronous function method)
        // https://developers.google.com/web/fundamentals/primers/promises
        return new Promise((resolve, reject) => {
            fs.readFile("./src/data/data.json", (err,data) => {
                if (err) { reject(err); } // reject error in promise
                else if (data) {
                    let users = JSON.parse(data);
                    const found = users.users.some(user => user.name === userReq.name);
                    let userCount = users.users.length;
                    if (!found) {
                        
                        let user = {
                            id: (parseInt(users.users[userCount-1].id) +  1).toString(),
                            name: userReq.name,
                            surname: userReq.surname,
                            role: userReq.role
                        }
                        users.users.push(user);
        
                        fs.writeFile("./src/data/data.json", JSON.stringify(users), (err) => {
                            if (err) {
                                reject(err); // reject error in promise
                            }
                        });
        
                        resolve(user); // resolve promise to return value
                    }  
                    else {
                        resolve("user already exists"); // resolve promise to return value
                    }
                }
            });
        });
    }
    */
    createUser(userReq) {
        // return promise (asynchronous function method)
        // https://developers.google.com/web/fundamentals/primers/promises
        return new Promise((resolve, reject) => {
            User.findUserByName(userReq.name, (err, res) => { // check if user exists
                if (err) {
                    reject(err);
                }
                if (res.length < 1) { // create user
                    User.createUser(userReq, (err, res) => {
                        if (err) {
                          reject(err);
                        }
                        resolve(res);
                    });
                }
                else {
                    reject("user already exists");
                }
            })
        });
    }

    deleteUSer(userId) {
        // return promise (asynchronous function method)
        // https://developers.google.com/web/fundamentals/primers/promises
        return new Promise((resolve, reject) => {
            fs.readFile("./src/data/data.json", (err,data) => {
                if (err) { reject(err); } // reject error in promise
                else if (data) {
                    let users = JSON.parse(data);
                    const found = users.users.some(user => user.id === userId);
                    if (found) {
                        users.users = users.users.filter(user => user.id != userId);

                        fs.writeFile("./src/data/data.json", JSON.stringify(users), (err) => {
                            if (err) {
                                reject(err); // reject error in promise
                            }
                        });

                        resolve("user was deleted"); // resolve promise to return value
                    }  
                    else {
                        resolve("user doesn't exist"); // resolve promise to return value
                    }
                }
            });
        });
    }

}