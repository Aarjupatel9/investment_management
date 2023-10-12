const Joi = require("joi");

exports.stokeValidator = Joi.object({
  product: Joi.string().required(),
  unitPrice: Joi.number().required(),
  QuantityInHand: Joi.number().required(),
  QuantitySold: Joi.number().required(),
  inventoryValue: Joi.number().required(),
  salesValue: Joi.number().required(),
  availabelStokes: Joi.number().required(),
  status: Joi.number().required(),
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
