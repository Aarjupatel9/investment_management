const mongoose = require('mongoose');
const bankSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        index:true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: true
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    branchName: {
        type: String,
        required: true
    },
    IFSCCode: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    accountOwner: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        required: true
    },
    nominee: [{
        name: {
            type: String,
            required: true
        },
        share: {
            type: Number,
            required: true
        }

    }],
    uploadPassbook: {
        type: String,
        required: false
    },

});

const bankmodel = mongoose.model('bankDetails', bankSchema);

module.exports = bankmodel;