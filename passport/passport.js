const passport = require('passport');
const jwtStatergy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const localStatergy = require('passport-local').Strategy;
const { JWT_SECRET } = require('../config/config');
const User = require("../models/user").User;
const bcrypt = require("bcryptjs");
const { HttpError } = require('../utils/http-error');

// json web token statergy
passport.use(new jwtStatergy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {

    try {

        //find manager specified in the token
        const manager = await User.findById(payload.sub);
        console.log(payload.sub);
        //if manager doesn't exisit handle it 
        if (!manager) {
            return done(null, false);
        }

        //otherwise return the manager
        done(null, manager);

    } catch (error) {
        done(error, false);
    }
}));


// local statergy

passport.use(new localStatergy({
    passReqToCallback:true,
    usernameField: 'username'
}, async  (req, username , password, done) =>{
    
    try {
       
        // find the user  from given email
        const user = await User.findOne({ email:username });
        console.log("user",user);
        // if not found  handle it 
        if(!user)
        {
            return done(new HttpError('Wrong credentials, please try again', 403) , false);
        }

        if(user.is_deleted ==true){
            return done(new HttpError('Account is not active, please contact administrator.', 403) , false); 
        }
        
        
     
        var isValidPassword = function(manager, password){
            return bcrypt.compareSync(password, manager.password);
        }
       
        // if user found check  password is correct
        const isMatch = await isValidPassword(user,password); 
        if(!isMatch)
        {
            return done(new HttpError('Wrong credentials, please try again', 403) , false);
        }
        
    
        // otherwise , return the user 
         done(null , user);
        
    } catch (error) {
        console.log(error);
        done(error , false);
    }
    
}));

