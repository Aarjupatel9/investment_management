
const Joi =require('joi');
exports.fdEditValidator = Joi.object({
    bankName: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: ['com', 'net', 'org', 'io'] } }).required(),
    idNo: Joi.number().required(),
    year: Joi.number().required(),
    matuiryDate: Joi.number().required(),
    depositeAccount: Joi.string().required(),
    nominee: Joi.array().items(
        Joi.object({
            name: Joi.string().required(),
            share: Joi.number().required(),
        })
    ),
    _id: Joi.string().allow(""),
});
