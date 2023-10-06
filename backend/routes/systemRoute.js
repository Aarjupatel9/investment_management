const express = require('express');
const { getAllVariables, uploadFile } = require('../controllers/systemController');
const authenticateRoles = require('../middlewares/authMiddleware');
const fileUploaderMiddleware = require('../middlewares/fileUploaderMiddleware');
const { ROLES } = require('../utils/constants')
const router = express.Router();

router.route("/getAllVariables").post(authenticateRoles([ROLES.HEAD,ROLES.STD_USER]), getAllVariables);

router.route('/upload-reports')
    .post(
        authenticateRoles([ROLES.HEAD,ROLES.STD_USER]),
        fileUploaderMiddleware('report', 'reports', 10), //fileType, fieldName, maxCount
        uploadFile
    );

router.route('/upload-certificates')
    .post(
        authenticateRoles([ROLES.HEAD,ROLES.STD_USER]),
        fileUploaderMiddleware('certificate', 'certificates', 10), //fileType, fieldName, maxCount
        uploadFile
    );


module.exports = router;