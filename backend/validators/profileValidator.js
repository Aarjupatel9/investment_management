const joi = require("joi");

exports.profileValidator = joi.object({
    userId: joi.string().min(0),
    firstName: joi.string().min(3).max(50).required(),
    lastName: joi.string().min(3).max(50).required(),
    personalDetails: joi.object({
        mobileNo: joi.string().pattern(/^\d{10}$/).required(),
        aadharNumber: joi.string().length(12).required(),
        panNumber: joi.string().required(),
        dateOfBirth: joi.date().required()
    }),
    nominee:joi.array().items(joi.object({
        name:joi.string().min(3).max(50).required(),
        email:joi.string().email({ tlds: { allow: ['com', 'net', 'org', 'io'] } }).required(),
        relationship:joi.string().min(3).max(50).required(),
    })),
    designation: joi.string().required(),
    address: joi.object({
        city: joi.string().required(),
        state: joi.string().required(),
        country: joi.string().required(),
        pincode: joi.string().required()
    }),
   
    profileImage: joi.string().allow(null, '')
});