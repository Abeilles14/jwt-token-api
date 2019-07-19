var mysqlConn = require("../database/database");

//Task object constructor
var User = (user) => {
    this.name = user.name;
    this.surname = user.surname;
    this.role = user.role;
    this.email = user.email;
    this.password = user.password;
};

User.createUser = (newUser, result) => {
    mysqlConn.query("INSERT INTO user set ?", newUser, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        } else {
        console.log(res);
        result(null, res);
        }
    });
};

User.findUserByName = (userName, result) => {
    mysqlConn.query("Select * from user where name = ?", userName, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        } else {
        console.log(res);
        result(null, res);
        }
    });
};

User.findUserByEmailAndPassword = (loginDetails, result) => {
    console.log("query to be made in user");
    mysqlConn.query("Select * from login where email = ? and password = ?",loginDetails, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        } else {
            console.log("found user");
        console.log(res);
        result(null, res);
        }
    });
};

User.findAllUsers = (result) => {
    mysqlConn.query("Select * from user", (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        } else {
        console.log(res);
        result(null, res);
        }
    });
};

module.exports = User;