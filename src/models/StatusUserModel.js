const mongoose = require('mongoose');

const statusUserSchema = new mongoose.Schema({
  key: { type: String, require: true },
  value: { type: String, require: true },
  description: { type: String, require: false },
});

const StatusUser = mongoose.model('StatusUser', statusUserSchema);
module.exports = StatusUser;
