const mongoose = require("mongoose");

const BookingIdSchema = new mongoose.Schema({
  selectedID: {type: Number},
})

const BookingId = mongoose.model('BookingId', BookingIdSchema)

module.exports = BookingId;
