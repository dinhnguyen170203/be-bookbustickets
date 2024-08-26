const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema(
  {
    key: { type: String, require: true, unique: true },
    value: { type: String, require: true },
    detail: { type: String, require: false },
  },
  {
    timestamps: true,
  }
);

const Destination = mongoose.model('Destination', destinationSchema);
module.exports = Destination;
