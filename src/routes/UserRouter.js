const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const UserService = require('../services/UserService');
const uploadCloud = require('../Middleware/uploader');
require('dotenv').config();

router.post('/create-user', UserController.createUser);
router.delete('/delete-user/:id', UserController.deleteUser);
router.get('/get-all-user', UserController.getAllUser);
router.post('/refresh-token', UserController.refreshToken);
router.post('/update-user', uploadCloud.single('avatar'), UserController.updateUser);
router.post('/update-user-service', UserController.updateUserService);
router.post('/register-user', UserController.registerUser);
router.post('/verify-email', UserController.verifyEmail);
router.post('/login-user', UserService.checkAccountStatus, UserController.loginUser);
router.get('/get-detail-user/:id', UserController.getDetailUser);
router.get('/get-detail-user-client/:id', UserController.getDetailUserClient);
router.post('/update-password', UserController.updatePassword);
router.post('/logout-user', UserController.logoutUser);
router.post('/lock-user-account', UserController.lockUserAccount);
router.post('/forgot-password', UserController.forgotPassword);
router.post('/verify-email-forgot-password', UserController.verifyEmailForgotPassword);
router.post('/create-new-password', UserController.createNewPassword);

module.exports = router;
