const mongoose = require('mongoose');


const profileSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        index: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    personalDetails: {
        mobileNo: {
            type: String,
            required: true
        },
        aadharNumber: {
            type: String,
            required: true
        },
        panNumber: {
            type: String,
            required: true
        },
        dateOfBirth: {
            type: Date,
            required: true
        }
    },
   nominee:[{
    name:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    relationship:
    {
        type:String,
        required:true
    }
   }],
    designation: {
        type: String,
        required: true
    },
    address: {
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        },

    },
    profileImage: {
        type: String
    }
});

const profileModel = mongoose.model('profiles', profileSchema);

module.exports = profileModel;