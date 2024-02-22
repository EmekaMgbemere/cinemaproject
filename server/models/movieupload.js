const mongoose = require("mongoose");

const movieUploadSchema = ({
    cinemahall:{type:Number},
    movietime:{type:String},
    movietitle:{type:String},
    moviedate:{type:String},
    sendcin:{type:String},
}
)

const movieupload = mongoose.model('movieupload', movieUploadSchema)

module.exports = movieupload;