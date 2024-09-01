const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');

router.post('/create-payment', PaymentController.createPayment);
router.get('/get-all-payment', PaymentController.getAllPayment);

module.exports = router;
