const express = require("express");

const authenticateRoles = require("../middlewares/authMiddleware");
const { ROLES } = require("../utils/constants");
const {
  AddStokeDetail,
  GetStokeDetail,
  GetStokeDetails,
  EditStokeDetail,
  DeleteStokeAccount,
} = require("../controllers/stokeController");
const router = express.Router();

router
  .route("/getStokeDetail/:id")
  .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]), GetStokeDetail);

router
  .route("/getStokeDetails")
  .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]), GetStokeDetails);

router
  .route("/AddStokeDetail")
  .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]), AddStokeDetail);
router
  .route("/updateStokeDetail/:id")
  .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]), EditStokeDetail);

router
  .route("/deleteStokeDetail/:id")
  .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]), DeleteStokeAccount);

module.exports = router;
