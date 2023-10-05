const User = require("../models/userModel");
const BankAccountModel = require("../models/bankaccountModel");
const FdAccountModel=require("../models/fdModel")
const { hashPassword } = require("../services/hashPassword");
const { userValidator } = require("../validators/userValidator");
const { passwordValidator } = require("../validators/authValidator");
const { ROLES } = require("../utils/constants");
const { fdDetailsvalidator } = require("../validators/fdValidator");

exports.GetUser = async (req, res) => {

    const { _id } = req.user;

    try {
        const user = await User.findById(_id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}


exports.EditUser = async (req, res) => {

    const { _id } = req.user;

    const { error } = userValidator.validate(req.body);

    if (error) {
        return res
            .status(400)
            .json({ success: false, error: error.details[0].message });
    }

    const { email, password } = req.body;

    let hash;
    if (password) {
        hash = await hashPassword(password);
    }

    try {
        const user = await User
            .findByIdAndUpdate(_id, {
                email: email,
                password: hash
            }, { new: true })
            .select("userName email isEmailVerified registeredOn lastLoggedInTime");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error." });
    }
}


exports.DeleteUser = async (req, res) => {

    const { _id } = req.user;

    try {
        const user = await User.findByIdAndDelete(_id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        res.status(200).json({ success: true, message: "User deleted successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false, message: "Internal Server Error."
        });
    }
}

