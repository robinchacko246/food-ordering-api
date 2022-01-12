const {User} = require("../models/user");
const bcrypt = require("bcryptjs");
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

module.exports = {

    SignUp: async (req, res) => {
        try {
            let { username, email, password } = req.body;
            console.log(req.body);

            let errors = [];

            if (!req.body.firstName) {
                errors.push({ message: "First name is mandatory" });
            }
            if (!req.body.lastName) {
                errors.push({ message: "Last name is mandatory" });
            }
            if (!req.body.email) {
                errors.push({ message: "Email field is mandatory" });
            }
            if (!req.body.password || !req.body.passwordConfirm) {
                errors.push({ message: "Password field is mandatory" });
            }
            if (req.body.password !== req.body.passwordConfirm) {
                errors.push({ message: "Passwords do not match" });
            }

            //otp
            

            const newUser = new User(req.body);
            let otp =  Math.floor(10000 + Math.random() * 90000);
            const otp_expired_at = otpExpireTime();
            const otp_next_attempt =  otpExpireTime(15);
            const otp_attempt =1;
            newUser.otp_expired_at=otp_expired_at;
            newUser.otp_next_attempt=otp_next_attempt;
            newUser.otp_attempt=otp_attempt;
            newUser.otp=otp;
            // generate the password hash (salt + password)
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);
            newUser.password=passwordHash;
            console.log(newUser);
            let result=await newUser.save();

             // generare token 
           const token = signToken(newUser);
           result.token=token;
            return res.status(200).json({ meessage: "User registered successfully",result:result });
            
           
        } catch (error) {
            console.log(error);
            res.status(400).send({ "status": 400, "message": "Error occured" });

        }
    },
    signIn:async(req, res, next) => {
        //generate token by passing req.user which here gives loggedin user
        console.log(req.user);
        const token =  signToken(req.user,req.body.remember_me);
        const userInfo =req.user;
        userInfo.token = token;
        res.status(200).json(userInfo);
    },
    update:async(req,res)=>{

        console.log(req.user);
        return res.status(200).json({ meessage: "User updated successfully" });

    }
    ,
    userDetails:async(req,res)=>
    {

        
        let user =await User.findOne({_id:req.params.user_id}).lean();
        res.status(200).json({ meessage: "User reg page" ,data:user});
    }
}







/********************************************************************************************************************************* */


signToken = (user,remember_me) => {
    // generate token
    return  JWT.sign({
            iss:'nodeapp',
            sub:  user._id,
            iat:  Math.floor(new Date().getTime() / 1000), // current time , 
            exp: Math.floor(new Date().setDate(new Date().getDate() +  (remember_me ? 3 :1)) / 1000)  // for one hour  Math.floor(Date.now() / 1000) + (60 * 60), for current time + 1 day use  Math.floor(new Date().setDate(new Date().getDate() + 1) / 1000)
        }, JWT_SECRET);
}

otpExpireTime = (time=10) =>{
         let otp_expired_at = new Date();
         otp_expired_at.setMinutes(otp_expired_at.getMinutes()+time);
         return otp_expired_at;
}
getTimestamp = (date) => {
    return   Math.floor(date / 1000);
}