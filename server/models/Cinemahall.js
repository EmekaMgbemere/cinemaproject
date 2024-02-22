const mongoose = require("mongoose")

const cinemaHallSchema = new mongoose.Schema({
    price:{type:Number},
    movietitle:{type:String},
    moviedescription:{type:String},
    movieimages:{type:String},
    moviedate:{type:String},
    sendcin:{type:String},
    theater:{type:String},
    movieid:{type:String},
    cinemaid:{type:String},
    theaterid:{type:String},
    movietime:{type:String},
    numImages:{type:Number},  
    seatnumber:{type:Number},
    cinematheaterID:{type:String},
    theaterlocation:{type:String},
    });

const Cinemahall = mongoose.model('Cinemahall', cinemaHallSchema);
module.exports = Cinemahall;

