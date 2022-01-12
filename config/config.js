"use strict"
const dotenv = require('dotenv');
dotenv.config();




//port connection and server running
console.log(`Running Port is ${process.env.PORT}`); // 3000
console.log('Running Environment',process.env.ENV);




//
let CONFIG = {
    mongoDbUrl : process.env.MONGO_DB_URL,
    url:process.env.MONGO_URL,
    PORT: process.env.PORT || 3000,
    JWT_SECRET:process.env.JWT_SECRET,
    globalVariables: (req, res, next) => {
        console.log(req);
        res.locals.success_message = req.flash('success-message');
        res.locals.error_message = req.flash('error-message');
        res.locals.user = req.user || null;
        next();
    },


};

module.exports = CONFIG;