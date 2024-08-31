const express = require("express");
const router = express.Router()
const UserController = require('../controllers/UserController');
require('dotenv').config()

router.post('/create-user', UserController.createUser)
router.delete('/delete-user/:id', UserController.deleteUser)
router.get('/get-all-user', UserController.getAllUser)


module.exports = router