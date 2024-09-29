const express = require('express');
const router = express.Router();
const DriverController = require('../controllers/DriverController');
const uploadCloud = require('../Middleware/uploadFile');

router.post('/create-driver', uploadCloud.single('image'), DriverController.createDriver);
router.post('/update-driver/:id', DriverController.updateDriver);
router.delete('/delete-driver/:id', DriverController.deleteDriver);
router.get('/get-all-driver', DriverController.getAllDriver);

module.exports = router;
