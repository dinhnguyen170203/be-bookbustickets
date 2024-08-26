const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema(
  {
    key: { type: String, require: true, unique: true },
    value: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const Time = mongoose.model('Time', timeSchema);
module.exports = Time;
