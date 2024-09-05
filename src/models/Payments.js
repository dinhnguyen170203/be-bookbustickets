const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  key: { type: String, require: true },
  value: { type: String, require: true },
  description: { type: String, require: false },
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
