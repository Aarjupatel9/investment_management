const express = require("express");

const authenticateRoles = require("../middlewares/authMiddleware");
const { ROLES } = require("../utils/constants");
const { EditFdAccount, GetFdDetails ,GetFdDetail,AddFdAccount,DeleteFdAccount} = require("../controllers/fdController");
const router = express.Router();

router
  .route("/getfdDetail/:id")
  .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]), GetFdDetail);

router
  .route("/getfdDetails")
  .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]), GetFdDetails);

router
  .route("/AddFdDetail")
  .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]), AddFdAccount);
router
  .route("/updateFdDetail/:id")
  .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]), EditFdAccount);

router
  .route("/deleteFdDetails/:id")
  .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]), DeleteFdAccount);

module.exports = router;
