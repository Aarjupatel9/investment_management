const Joi = require("joi");

exports.lockerValidator = Joi.object({
  branchName: Joi.string().required(),
  accountNumber: Joi.string().required(),
  lockerHolder: Joi.string().required(),
  lockerNumber: Joi.string().required(),
  IFSCCode: Joi.string().required(),
  lockerSize: Joi.number().required(),
  nominee: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        share: Joi.number().required(),
      })
    )
    .required(),
  document: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().required(),
      })
    )
    .required(),
});
