const express = require('express');
const fs = require("fs");
const userRoutes = require("./src/api/user-routes");
const authRoutes = require("./src/api/auth-routes");

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
});


// Cross-Origin Middleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//Middleware function:
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

//Middleware execue:
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//App routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
