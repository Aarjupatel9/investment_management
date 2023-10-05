const User = require("../models/userModel");
const BankAccountModel = require("../models/bankaccountModel");

const { bankDetailsvalidator } = require("../validators/bankValidator");
const { hashPassword } = require("../services/hashPassword");
const { userValidator } = require("../validators/userValidator");
const { passwordValidator } = require("../validators/authValidator");
const { bankEditValidator } = require("../validators/bankValidator");

const { ROLES } = require("../utils/constants");

exports.GetBankDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await BankAccountModel.findById(id);
    console.log("id : ", id, "  user: ", user);
    if (!user) {
      return res
        .status(200)
        .json({ status: false, message: "BankAccount not found." });
    }
    res.status(200).json({ success: true, bank: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};
exports.GetBankDetails = async (req, res) => {
  const { _id } = req.user;
  try {
    const bank = await BankAccountModel.find({ userId: _id }).exec();
    res.status(200).json({ success: true, bank });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

// exports.EditBankAccount = async (req, res) => {

//     const { _id } = req.user;
//     const data = req.body;
//     console.log("before error");
//     const { error } = bankDetailsvalidator.validate(req.body);
//     console.log("after error");
//     if (error) {
//         console.log("ENTER IF");
//         return res
//             .status(400)
//             .json({ success: false, error: error.details[0].message });
//     }
//     else {
//         console.log("enter else");
//         try {
//             if (data._id == "") {
//                 console.log("enter inner if");
//                 delete data._id;
//                 const newProduct = new BankAccountModel(data);
//                 await newProduct.save();
//                 if (!newProduct) {
//                     return res
//                         .status(404)
//                         .json({ success: false, message: "bankDetils not found" });
//                 }
//                 res.status(200).json({ success: true, message: "bankDetails successfully added", bank: newProduct });

//             } else {
//                 console.log("inner else");
//                 const product = await BankAccountModel
//                     .findByIdAndUpdate(
//                         data._id,
//                         data,
//                         {
//                             new: true,
//                             upsert: true
//                         });

//                 if (!product) {
//                     return res
//                         .status(404)
//                         .json({ success: false, message: "bankDetils not found" });
//                 }
//                 res.status(200).json({ success: true, message: "bankDetils successfully updated", bank: product });

//             }

//         } catch (error) {
//             console.log(error);
//             res.status(500).json({ success: false, message: "Internal Server Error." });
//         }
//     }
// }

exports.EditBankAccount = async (req, res) => {
  const { error } = bankDetailsvalidator.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, error: error.details[0].message });
  }
  const { _id } = req.user;
  const achievementId = req.params.id;
  const achievementData = req.body;
  try {
    const achievement = await BankAccountModel.findOneAndUpdate(
      { _id: achievementId, userId: _id },
      achievementData,
      { new: true }
    ).exec();

    if (!achievement) {
      return res
        .status(200)
        .json({ success: false, message: "bankDetails not found." });
    }
    res
      .status(200)
      .json({ success: true, message: "bankDetails updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};
exports.AddBankAccount = async (req, res) => {
  const { error } = bankDetailsvalidator.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, error: error.details[0].message });
  }
  const { _id } = req.user;
  const achievementData = req.body;
  try {
    const bank = await BankAccountModel({
      userId: _id,
      ...achievementData,
    });
    await bank.save();
    res.status(200).json({ success: true, bank, message: "bankDetails added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};
exports.DeleteBankAccount = async (req, res) => {
  const { _id } = req.user;
  const achievementId = req.params.id;
  console.log(achievementId, "  ", _id);
  try {
    const achievement = await BankAccountModel.findOneAndDelete({
      _id: achievementId,
      userId: _id,
    });

    if (!achievement) {
      return res
        .status(404)
        .json({ success: false, message: "Bank account not found." });
    }
    res
      .status(200)
      .json({ success: true, message: "Bank account deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};
