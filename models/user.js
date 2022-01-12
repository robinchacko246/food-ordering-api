const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    
    lastName: {
        type: String,
        required: true
    },
    // userName:{
    //     type: String,
    //     required: false
        
    // },
    email: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
       
    },
    otp:{
        type:String
    },
    otp_expired_at:{
        type:String

    },
    otp_next_attempt:{
        type:String

    },
    otp_attempt:{
        type:String

    }


});

module.exports = {User: mongoose.model('user', UserSchema )};