const FdAccountModel = require("../models/fdModel");
const { fdEditValidator } = require("../validators/fdValidator");

exports.GetFdDetail = async (req, res) => {
  const { id } = req.params.id;
  console.log("id : ",id)
  try {
    const user = await FdAccountModel.findById(id);
    if (!user) {
      return res.status(404).json({  success: false, message: "User not found." });
    }
    res.status(200).json({ success: true, Fd: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({  success: false, message: "Internal Server Error." });
  }
};
exports.GetFdDetails = async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await FdAccountModel.find({ userId: _id });
    console.log("id : ", _id, " , ",user)
    // res.status(200).json({ success: true, Fds: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({  success: false, message: "Internal Server Error." });
  }
};

exports.AddFdAccount = async (req, res) => {
  const { error } = fdEditValidator.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, error: error.details[0].message });
  }
  const { _id } = req.user;
  const achievementData = req.body;
  try {
    const bank = await FdAccountModel({
      userId: _id,
      ...achievementData,
    });
    await bank.save();
    res
      .status(200)
      .json({ success: true, fd: bank, message: "FD Details added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false,  message: "Internal Server Error." });
  }
};

exports.EditFdAccount = async (req, res) => {
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
    const achievement = await FdAccountModel.findOneAndUpdate(
      { _id: achievementId, userId: _id },
      achievementData,
      { new: true }
    ).exec();

    if (!achievement) {
      return res
        .status(200)
        .json({ success: false, message: "FD Details not found." });
    }
    res
      .status(200)
      .json({
        success: true,
        fd: achievement,
        message: "FD Details updated successfully.",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

exports.DeleteFdAccount = async (req, res) => {
  const { _id } = req.user;
  const achievementId = req.params.id;
  console.log(achievementId, "  ", _id);
  try {
    const achievement = await FdAccountModel.findOneAndDelete({
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
