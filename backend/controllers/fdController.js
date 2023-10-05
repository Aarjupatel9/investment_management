const User = require("../models/userModel");
const FdAccountModel=require("../models/fdModel");
const { hashPassword } = require("../services/hashPassword");
const { userValidator } = require("../validators/userValidator");
const { passwordValidator } = require("../validators/authValidator");
const { fdEditValidator} = require("../validators/fdValidator");
const { ROLES } = require("../utils/constants");
const { use } = require("../routes/userRoute");



exports.GetFdDetails = async (req, res) => {

    const { _id } = req.user;

    try {
        const user = await FdAccountModel.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({ success: true, bank: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}
exports.EditFdAccount = async (req, res) => {

    const { _id } = req.user;

    const { error } = fdEditValidator.validate(req.body);

    if (error) {
        return res
            .status(400)
            .json({ success: false, error: error.details[0].message });
    }
    
    
    try {
        const user = await FdAccountModel
            .findByIdAndUpdate(_id,req.body, { new: true })
            .select("userName email isEmailVerified registeredOn lastLoggedInTime");
 console.log("")
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        res.status(200).json({ success: true, fd:user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error." });
    }
}
