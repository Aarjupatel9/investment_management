const joi = require('joi')

exports.userLoginValidator = joi.object({
    email:joi.string().email({ tlds: { allow: ['com', 'net', 'org', 'io'] } }).required(),
    password: joi.string().min(6).required(),
})

exports.userSignupValidator = joi.object({
    name:joi.string().min(3).required(),
    email:joi.string().email({ tlds: { allow: ['com', 'net', 'org', 'io'] } }).required(),
    pass: joi.string().min(6).required(),
    confirmpass: joi.string().min(6).required(),
    phone:joi.string().min(10).required(),
    address:joi.string().required()
})

exports.resetPassValidator = joi.object({
    token: joi.string().length(64).required(),
    password: joi.string().min(6).required()
})

exports.passwordValidator = joi.object({ password: joi.string().min(6).required() })

exports.emailValidator = joi.object({ email: joi.string().email().required() })

exports.tokenValidator = joi.object({
    token: joi.string().length(64).required()
})

exports.contactUsValidator = joi.object({
    name: joi.string().max(20),
    email: joi.string().email().required(),
    message: joi.string().max(1500).required(),
    captchaToken: joi.string().required()
})