const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  time: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Time',
    required: true,
  },
  dayStart: { type: Date, require: true },
  numberOfBooked: { type: Number, require: false },
  numberOfAvailable: { type: Number, require: false },
  price: { type: Number, require: true },
  departure: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Departure',
    required: true,
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true,
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true,
  },
});

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
