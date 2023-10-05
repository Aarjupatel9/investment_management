const joi = require("joi");

exports.userValidator = joi.object({
    email: joi.string().email(),
    password: joi.string().min(6)
})
