const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: { type: String, require: true, unique: true },
  licensePlate: { type: String, require: true },
  numberOfSeats: { type: Number, require: true },
  yearOfManufacture: { type: String, require: false },
  type: { type: String, require: true },
  color: { type: String, require: true },
  image: { type: String, require: true },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StatusCar',
    required: true,
  },
  note: { type: String, require: false },
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;
