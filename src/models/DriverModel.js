const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  idNumber: { type: String, require: false },
  name: { type: String, require: true },
  address: { type: String, require: true },
  // dateOfBirth: { type: Date, require: true },
  phoneNumber: { type: String, require: true },
  personalInformation: { type: String, require: true },
  image: { type: String, require: true },
  workHistory: { type: String, require: true },
  // workSchedule: { type: String, require: true },
});

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver;
