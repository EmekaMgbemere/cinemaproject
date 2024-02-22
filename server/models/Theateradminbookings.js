const mongoose = require("mongoose");

const TheateradminbookingsSchema = new mongoose.Schema({
  price: {type: Number},
  movietime: {type: String},
  movietitle: {type: String},
  theater: {type: String},
  userType:{type:String},
  theaterid:{type:String},
  cinemaId:{type:String},
  movieid:{type:String}
  
  // theaterid: {type: mongoose.Schema.Types.ObjectId},
  // cinemaid: {type:mongoose.Schema.Types.ObjectId},
  // movieid: {type: mongoose.Schema.Types.ObjectId},
})

const Theateradminbookings = mongoose.model('Theateradminbookings', TheateradminbookingsSchema)

module.exports = Theateradminbookings;
