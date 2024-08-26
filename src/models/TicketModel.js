const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  dayBooked: { type: Date, default: Date.now(), require: true },
  numberOfBooked: { type: Number, require: true, default: 1 },
  totalPrice: { type: Number, require: true },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
    required: false,
  },
  isPaid: { type: Boolean, default: false, require: true },
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
