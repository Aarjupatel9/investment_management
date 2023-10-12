const LicModel = require("../models/licModel");
const { licValidator } = require("../validators/licValidator");

exports.GetLicDetail = async (req, res) => {
  const { id } = req.params;
  console.log("id : ",req.params.id)
  try {
    const user = await LicModel.findById(id);
    if (!user) {
      return res.status(404).json({  success: false, message: "User not found." });
    }
    res.status(200).json({ success: true, Lic: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({  success: false, message: "Internal Server Error." });
  }
};
exports.GetLicDetails = async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await LicModel.find({ userId: _id });
    // console.log("id : ", _id, " , ",user)
    res.status(200).json({ success: true, Lics: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({  success: false, message: "Internal Server Error." });
  }
};

exports.AddLicDetail = async (req, res) => {
  const { error } = licValidator.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, error: error.details[0].message });
  }
  const { _id } = req.user;
  const achievementData = req.body;
  try {
    const bank = await LicModel({
      userId: _id,
      ...achievementData,
    });
    await bank.save();
    res
      .status(200)
      .json({ success: true, fd: bank, message: "LIC Details added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false,  message: "Internal Server Error." });
  }
};

exports.EditLicDetail = async (req, res) => {
  const { error } = licValidator.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, error: error.details[0].message });
  }
  const { _id } = req.user;
  const achievementId = req.params.id;
  const achievementData = req.body;
  try {
    const achievement = await LicModel.findOneAndUpdate(
      { _id: achievementId, userId: _id },
      achievementData,
      { new: true }
    ).exec();

    if (!achievement) {
      return res
        .status(200)
        .json({ success: false, message: "LIC Details not found." });
    }
    res
      .status(200)
      .json({
        success: true,
        fd: achievement,
        message: "LIC Details updated successfully.",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

exports.DeleteLicAccount = async (req, res) => {
  const { _id } = req.user;
  const achievementId = req.params.id;
  console.log(achievementId, "  ", _id);
  try {
    const achievement = await LicModel.findOneAndDelete({
      _id: achievementId,
      userId: _id,
    });

    if (!achievement) {
      return res
        .status(404)
        .json({ success: false, message: "LIC not found." });
    }
    res
      .status(200)
      .json({ success: true, message: "LIC deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};
