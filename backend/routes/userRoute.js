const express = require('express');
const { GetUser, DeleteUser, ResetPass, EditUser} = require('../controllers/userController');
const{GetBankDetails,EditBankAccount,GetBankDetail,AddBankAccount,DeleteBankAccount}=require('../controllers/bankaccountController');
const authenticateRoles = require('../middlewares/authMiddleware');
const { ROLES } = require('../utils/constants')
const {EditFdAccount,GetFdDetails}=require('../controllers/fdController')
const router = express.Router();

router.route("/getUser")
    .get(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]), GetUser);
router.route("/updateUser")
    .post(authenticateRoles([ROLES.HEAD]), EditUser);
router.route("/deleteUser")
    .post(authenticateRoles([ROLES.HEAD]), DeleteUser);



router.route("/getBankDetail/:id")
.post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]),GetBankDetail);

router.route("/getBankDetails")
.post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]),GetBankDetails);

router.route("/getfdDetail")
    .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]), GetFdDetails);

router.route("/updateBankDetail/:id")
    .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]),EditBankAccount);
    router.route("/AddBankDetail")
    .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]),AddBankAccount);
    router.route("/deletebankdetails/:id")
    .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]),DeleteBankAccount);


router.route("/updatefdDetail")
    .post(authenticateRoles([ROLES.HEAD, ROLES.STD_USER]),EditFdAccount);

module.exports = router;