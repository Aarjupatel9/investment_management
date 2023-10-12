const express = require("express");

const authenticateRoles = require("../middlewares/authMiddleware");
const { ROLES } = require("../utils/constants");
const {
  AddLockerDetail,
  GetLockerDetail,
  GetLockerDetails,
  EditLockerDetail,
  DeleteLockerAccount,
} = require("../controllers/lockerController");
const router = express.Router();

router
  .route("/getLockerDetail/:id")
  .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]), GetLockerDetail);

router
  .route("/getLockerDetails")
  .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]), GetLockerDetails);

router
  .route("/AddLockerDetail")
  .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]), AddLockerDetail);
router
  .route("/updateLockerDetail/:id")
  .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]), EditLockerDetail);

router
  .route("/deleteLockerDetail/:id")
  .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]), DeleteLockerAccount);

module.exports = router;
