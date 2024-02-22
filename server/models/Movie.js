const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    movietitle:{type:String},
    moviedescription:{type:String},
    movieimage:{type:String},
    movielocation:{type:String},
    theaterid:{type:String},
    cinemafromadminID:{type:String},
    comingsoonID:{type:String},
    movietrailer:{type: String},
    nowshowingID:{type: String},
    pg:{type: Number}, 
    movieduration:{type: Number}, 
    
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;

