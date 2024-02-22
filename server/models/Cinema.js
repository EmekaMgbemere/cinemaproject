const mongoose = require("mongoose")

const cinemaSchema = new mongoose.Schema({
    movielocation:{type:String},
    hallname:{type:String},
    countername:{type:String},
    hallid:{type:String},
    counterid:{type:String},
    theaterid:{type:String},
});

const Cinema = mongoose.model('Cinema', cinemaSchema);
module.exports = Cinema;

