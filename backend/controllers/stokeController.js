const StokeModel = require("../models/stokeModel");
const { stokeValidator } = require("../validators/stokeValidator");

exports.GetStokeDetail = async (req, res) => {
  const { id } = req.params;
  console.log("id : ",req.params.id)
  try {
    const user = await StokeModel.findById(id);
    if (!user) {
      return res.status(404).json({  success: false, message: "User not found." });
    }
    res.status(200).json({ success: true, Stoke: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({  success: false, message: "Internal Server Error." });
  }
};
exports.GetStokeDetails = async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await StokeModel.find({ userId: _id });
    // console.log("id : ", _id, " , ",user)
    res.status(200).json({ success: true, Stokes: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({  success: false, message: "Internal Server Error." });
  }
};

exports.AddStokeDetail = async (req, res) => {
  const { error } = stokeValidator.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, error: error.details[0].message });
  }
  const { _id } = req.user;
  const achievementData = req.body;
  try {
    const bank = await StokeModel({
      userId: _id,
      ...achievementData,
    });
    await bank.save();
    res
      .status(200)
      .json({ success: true, fd: bank, message: "stoke Details added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false,  message: "Internal Server Error." });
  }
};

exports.EditStokeDetail = async (req, res) => {
  const { error } = stokeValidator.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, error: error.details[0].message });
  }
  const { _id } = req.user;
  const achievementId = req.params.id;
  const achievementData = req.body;
  try {
    const achievement = await StokeModel.findOneAndUpdate(
      { _id: achievementId, userId: _id },
      achievementData,
      { new: true }
    ).exec();

    if (!achievement) {
      return res
        .status(200)
        .json({ success: false, message: "stoke Details not found." });
    }
    res
      .status(200)
      .json({
        success: true,
        fd: achievement,
        message: "stoke Details updated successfully.",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

exports.DeleteStokeAccount = async (req, res) => {
  const { _id } = req.user;
  const achievementId = req.params.id;
  console.log(achievementId, "  ", _id);
  try {
    const achievement = await StokeModel.findOneAndDelete({
      _id: achievementId,
      userId: _id,
    });

    if (!achievement) {
      return res
        .status(404)
        .json({ success: false, message: "Stoke not found." });
    }
    res
      .status(200)
      .json({ success: true, message: "Stoke deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};
