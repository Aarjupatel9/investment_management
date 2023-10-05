const User = require("../models/userModel");
const Bank = require("../models/bankaccountModel");

const { bankDetailsvalidator } = require("../validators/bankValidator");
const { hashPassword } = require("../services/hashPassword");
const { userValidator } = require("../validators/userValidator");
const { passwordValidator } = require("../validators/authValidator");
const { bankEditValidator} = require("../validators/bankValidator");

const { ROLES } = require("../utils/constants");

exports.GetBankDetail = async (req, res) => {

    const { _id } = req.params;

    try {
        const user = await BankAccountModel.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({ success: true, bank: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}
exports.EditBankDetails = async (req, res) => {

    const { _id } = req.user;
    const data = req.body;
    console.log("before error");
    const { error } = bankDetailsvalidator.validate(req.body);
    console.log("after error");
    if (error) {
        console.log("ENTER IF");
        return res
            .status(400)
            .json({ success: false, error: error.details[0].message });
    }
    else {
        console.log("enter else");
        try {
            if (data._id == "") {
                console.log("enter inner if");
                delete data._id;
                const newProduct = new BankAccountModel(data);
                await newProduct.save();
                if (!newProduct) {
                    return res
                        .status(404)
                        .json({ success: false, message: "bankDetils not found" });
                }
                res.status(200).json({ success: true, message: "bankDetails successfully added", bank: newProduct });

            } else {
                console.log("inner else");
                const product = await BankAccountModel
                    .findByIdAndUpdate(
                        data._id,
                        data,
                        {
                            new: true,
                            upsert: true
                        });

                if (!product) {
                    return res
                        .status(404)
                        .json({ success: false, message: "bankDetils not found" });
                }
                res.status(200).json({ success: true, message: "bankDetils successfully updated", bank: product });

            }

        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Internal Server Error." });
        }
    }

}

exports.GetBankDetails = async (req, res) => {
    
    const { _id } = req.user;
    try {

        const achievements = await BankAccountModel.find({ userId: _id })
             .exec();

        res.status(200).json({ success: true, achievements });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}
