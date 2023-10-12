


const Joi = require('joi');

exports.licValidator = Joi.object({
  policyNumber: Joi.string().required(),
  income: Joi.number().required(),
  agentCode: Joi.string().required(),
  agentName: Joi.string().required(),
  planName: Joi.string().required(),
  planNumber: Joi.string().required(),
  term: Joi.string().required(),
  planTerm: Joi.string().required(),
  type: Joi.string().required(),
  premiumDate: Joi.date().required(),
  lastDate: Joi.date().required(),
  sumAssured: Joi.number().required(),
  insuranceAmmount: Joi.number().required(),
  maturityDate: Joi.date().required(),
  nominee: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      share: Joi.number().required(),
    })
  ).required(),
  document: Joi.array().items(
    Joi.object({
      url: Joi.string().required(),
    })
  ).required(),
});


