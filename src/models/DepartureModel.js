const mongoose = require('mongoose');

const departureSchema = new mongoose.Schema(
  {
    key: { type: String, require: true, unique: true },
    value: { type: String, require: true },
    detail: { type: String, require: false },
  },
  {
    timestamps: true,
  }
);

const Departure = mongoose.model('Departure', departureSchema);
module.exports = Departure;
