const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
    time: { type: Date, default: Date.now, index: { expires: 300 } },
    password: { type: String, required: false },
    name: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Otp = mongoose.model('Otp', otpSchema);
module.exports = Otp;
