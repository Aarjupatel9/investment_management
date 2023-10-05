const express = require('express');
const {  GetProfile, EditProfile, DeleteProfile,uploadProfileImage } = require('../controllers/profileController');
const authenticateRoles = require('../middlewares/authMiddleware');
const fileUploaderMiddleware=require('../middlewares/fileUploaderMiddleware');
const router = express.Router();
const { ROLES } = require('../utils/constants')

// user specific operations

router.route("/getProfile")
    .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]), GetProfile);
router.route("/updateProfile")
    .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]), EditProfile);
router.route("/deleteProfile")
    .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]), DeleteProfile);
router.route('/upload-Profile-Image').post(
        authenticateRoles([ROLES.HEAD, ROLES.STD_USER]),
        fileUploaderMiddleware('profileImage', 'profileImage', 1), // fieldName, directoryName, maxCount
        uploadProfileImage
    );

// other operations
router.route("/profile/:id").post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]),GetProfile); // public route to get user's profile details

module.exports = router;