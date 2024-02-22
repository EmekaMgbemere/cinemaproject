const mongoose = require("mongoose")

const locationSchema = new mongoose.Schema({
    id: {type:String},
    location: {type:String},
    image: {type:String},
    state: {type:String},
    city: {type:String},
    street: {type:String},
    housenumber: {type:Number}

});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;

