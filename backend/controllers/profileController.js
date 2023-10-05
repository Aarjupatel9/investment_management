const Profile = require('../models/profileModel');
const { profileValidator } = require('../validators/profileValidator');

exports.GetProfile = async (req, res) => {
    var { _id } = req.user;
    if (req.body._id) {
        _id = req.body._id;
    }
    try {
        const profile = await Profile.findById(_id).select("-_id -__v");
        // console.log("get profile",profile);
        if (!profile) {
            return res
                .status(404)
                .json({ success: false, message: "User profile not found." });
        }
        res.status(200).json({ success: true, profile });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}
exports.uploadProfileImage = async (req, res) => {
    var { _id } = req.user;
    const profileImage = req.fileUrls[0];
    try {
        const updatedProfileImage = await Profile
            .findByIdAndUpdate(
                _id,
                {
                    profileImage: profileImage
                },
                {
                    new: true,
                    upsert: true
                })
            .select("profileImage");

        if (!updatedProfileImage) {
            return res
                .status(404)
                .json({ success: false, message: "User profile not found." });
        }

        res.status(200).json({ success: true, updatedProfileImage ,message:"profile image updated."});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}
exports.EditProfile = async (req, res) => {

    const { error } = profileValidator.validate(req.body);

    if (error) {
        return res
            .status(400)
            .json({ success: false,message: error.details[0].message });
    }

    const _id = req.user;

    const profileData = req.body;


    try {
        const profile = await Profile
            .findByIdAndUpdate(
                _id,
                profileData,
                {
                    new: true,
                    upsert: true
                });
            // .select("name address designation joiningDate experience profileImage");

        if (!profile) {
            return res
                .status(404)
                .json({ success: false, message: "User profile not found" });
        }
        res.status(200).json({ success: true, message: "profile successfully updated", profile: profile });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}

exports.DeleteProfile = async (req, res) => {

    const { _id } = req.user;
    try {
        const profile = await Profile.findByIdAndDelete(_id);
        if (!profile) {
            return res
                .status(404)
                .json({ success: false, message: "User profile not found." });
        }
        res.status(200).json({ success: true, message: "User profile deleted successfully." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}