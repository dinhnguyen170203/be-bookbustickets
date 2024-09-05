const express = require('express');
const router = express.Router();
const DepartureController = require('../controllers/DepartureController');

router.post('/create-departure', DepartureController.createDeparture);
router.post('/update-departure', DepartureController.updateDeparture);
router.delete('/delete-departure/:id', DepartureController.deleteDeparture);
router.get('/get-all-departure', DepartureController.getAllDeparture);

module.exports = router;
