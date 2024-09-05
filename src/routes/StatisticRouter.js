const express = require('express');
const router = express.Router();
const StatisticsController = require('../controllers/StatisticsController');

router.get('/get-all-statistics', StatisticsController.getAllStatistics);

module.exports = router;
