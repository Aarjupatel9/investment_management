
const { ROLES, DESIGNATIONS, GUIDE_TYPE, PUBLICATION_TYPE, GRANT_TYPES, QUALIFICATION_STATUS, QUALIFICATION_TYPE } = require("../utils/constants");

exports.getAllVariables = async (req, res) => {
    try {
        var variables = {
            ROLES: ROLES,
            DESIGNATIONS: DESIGNATIONS,
            GUIDE_TYPE: GUIDE_TYPE,
            PUBLICATION_TYPE: PUBLICATION_TYPE,
            GRANT_TYPES: GRANT_TYPES,
            QUALIFICATION_STATUS: QUALIFICATION_STATUS,
            QUALIFICATION_TYPE: QUALIFICATION_TYPE
        }

        res.status(200).json({ success: true, variables });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}

exports.uploadFile = async (req, res) => {
    const uploadedFiles = req.fileUrls;
    res.status(200).json({ success: true, uploadedFiles, message: "file successfully uploaded" });
}
