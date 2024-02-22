const mongoose = require("mongoose")

const TheaterSchema = new mongoose.Schema({
    thall:{type:String},
});

const theaterhall = mongoose.model('', TheaterSchema);
module.exports = theaterhall;

