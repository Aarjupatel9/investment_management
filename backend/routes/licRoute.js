const express = require("express");

const authenticateRoles = require("../middlewares/authMiddleware");
const { ROLES } = require("../utils/constants");
const {
  AddLicDetail,
  GetLicDetail,
  GetLicDetails,
  EditLicDetail,
  DeleteLicAccount,
} = require("../controllers/licController");
const router = express.Router();

router
  .route("/getLicDetail/:id")
  .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]), GetLicDetail);

router
  .route("/getLicDetails")
  .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]), GetLicDetails);

router
  .route("/AddLicDetail")
  .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]), AddLicDetail);
router
  .route("/updateLicDetail/:id")
  .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]), EditLicDetail);

router
  .route("/deleteLicDetail/:id")
  .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]), DeleteLicAccount);

module.exports = router;
