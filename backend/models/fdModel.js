const mongoose = require('mongoose');
const fdSchema = mongoose.Schema({
    idNo: {
        type: String,
        required: true,
    },
    bankName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true,
    },
   
    depositeAccount: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true
    },
    matuiryDate: {
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
});

const fdmodel = mongoose.model('fdDetails', fdSchema);

module.exports = fdmodel;