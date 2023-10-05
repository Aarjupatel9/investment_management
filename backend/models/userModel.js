const mongoose = require('mongoose');
const { ROLES } = require('../utils/constants');
const { boolean, number } = require('joi');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address:{
        type : String,
        required: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(ROLES),
        default: ROLES.STD_USER
    },
   lastLoginTime:
   {
    type:Number,
    required:false
   }
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;