import Joi from "joi";
export const bankDetailsvalidator = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net", "org", "io"] } })
    .required(),
  phoneNumber: Joi.number().required(),
  address: Joi.string().required(),
  branchName: Joi.string().required(),
  IFSCCode: Joi.string().required(),
  customerId: Joi.string().required(),
  accountNumber: Joi.string().required(),
  accountOwner: Joi.string().required(),
  accountType: Joi.string().required(),
  nominee: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      share: Joi.number().required(),
    })
  ),
  uploadPassbook: Joi.array().items(
    Joi.object({
      url: Joi.string().required(),
    })
  ),
  _id: Joi.string().allow(""),
});

export const fdDetailsvalidator = Joi.object({
  bankName: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net", "org", "io"] } })
    .required(),
  idNo: Joi.number().required(),
  year: Joi.number().required(),
  matuiryDate: Joi.date().required(),
  depositeAccount: Joi.string().required(),
  nominee: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      share: Joi.number().required(),
    })
  ),
  document: Joi.array().items(
    Joi.object({
      url: Joi.string().required(),
    })
  ),
  _id: Joi.string().allow(""),
});
