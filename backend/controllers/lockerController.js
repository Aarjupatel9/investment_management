const LockerModel = require("../models/lockerModel");
const { lockerValidator } = require("../validators/lockerValidator");

exports.GetLockerDetail = async (req, res) => {
  const { id } = req.params;
  console.log("id : ",req.params.id)
  try {
    const user = await LockerModel.findById(id);
    if (!user) {
      return res.status(404).json({  success: false, message: "User not found." });
    }
    res.status(200).json({ success: true, Locker: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({  success: false, message: "Internal Server Error." });
  }
};
exports.GetLockerDetails = async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await LockerModel.find({ userId: _id });
    // console.log("id : ", _id, " , ",user)
    res.status(200).json({ success: true, Lockers: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({  success: false, message: "Internal Server Error." });
  }
};

exports.AddLockerDetail = async (req, res) => {
  const { error } = lockerValidator.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, error: error.details[0].message });
  }
  const { _id } = req.user;
  const achievementData = req.body;
  try {
    const bank = await LockerModel({
      userId: _id,
      ...achievementData,
    });
    await bank.save();
    res
      .status(200)
      .json({ success: true, fd: bank, message: "locker Details added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false,  message: "Internal Server Error." });
  }
};

exports.EditLockerDetail = async (req, res) => {
  const { error } = lockerValidator.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, error: error.details[0].message });
  }
  const { _id } = req.user;
  const achievementId = req.params.id;
  const achievementData = req.body;
  try {
    const achievement = await LockerModel.findOneAndUpdate(
      { _id: achievementId, userId: _id },
      achievementData,
      { new: true }
    ).exec();

    if (!achievement) {
      return res
        .status(200)
        .json({ success: false, message: "locker Details not found." });
    }
    res
      .status(200)
      .json({
        success: true,
        fd: achievement,
        message: "locker Details updated successfully.",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

exports.DeleteLockerAccount = async (req, res) => {
  const { _id } = req.user;
  const achievementId = req.params.id;
  console.log(achievementId, "  ", _id);
  try {
    const achievement = await LockerModel.findOneAndDelete({
      _id: achievementId,
      userId: _id,
    });

    if (!achievement) {
      return res
        .status(404)
        .json({ success: false, message: "Locker not found." });
    }
    res
      .status(200)
      .json({ success: true, message: "Locker deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};
