const express = require('express');
const router = express.Router();
const CarController = require('../controllers/CarController');
const uploadCloud = require('../Middleware/uploadFile');

router.post('/create-car', uploadCloud.single('image'), CarController.createCar);
router.post('/update-car/:id', CarController.updateCar);
router.delete('/delete-car/:id', CarController.deleteCar);
router.get('/get-all-car', CarController.getAllCar);
router.get('/get-cars-status', CarController.getCarsStatus);

//status
router.post('/create-status-car', CarController.createStatusCar);
router.get('/get-all-status-car', CarController.getAllStatusCar);

module.exports = router;
