const mongoose = require('mongoose');

const statusCarSchema = new mongoose.Schema(
  {
    key: { type: String, require: true },
    value: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const StatusCar = mongoose.model('StatusCar', statusCarSchema);
module.exports = StatusCar;
