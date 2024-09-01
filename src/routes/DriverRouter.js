const express = require('express');
const router = express.Router();
const DriverController = require('../controllers/DriverController');

router.post('/create-driver', DriverController.createDriver);
router.post('/update-driver/:id', DriverController.updateDriver);
router.delete('/delete-driver/:id', DriverController.deleteDriver);
router.get('/get-all-driver', DriverController.getAllDriver);

module.exports = router;
