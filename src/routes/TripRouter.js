const express = require('express');
const router = express.Router();
const TripController = require('../controllers/TripController');

router.post('/create-trip', TripController.createTrip);
router.post('/update-trip', TripController.updateTrip);
router.post('/update-number-of-seats', TripController.updateNumberOfSeats);
router.delete('/delete-trip/:id', TripController.deleteTrip);
router.get('/get-all-trip', TripController.getAllTrip);
router.get('/search-trips', TripController.searchTrips);

//time
router.post('/create-time', TripController.createTime);
router.get('/get-all-time', TripController.getAllTime);

module.exports = router;
