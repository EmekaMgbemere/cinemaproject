const mongoose = require("mongoose")

const movieSchema = ({
    id:{
        type: mongoose.Schema.ObjectId, 
        auto: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    trailerlink:{
        type: String,
    },
    rating:{
        type:Number,
    },
    pg:{
        type:Number,
    },
    duration:{
        type:Number,
    },
    thumbnail:{
        type: String,
        required: true, 
    },
    banner:{
        type: String,
        data: Buffer
    },
    companyID:{
        type: mongoose.Schema.ObjectId, 
        auto: true,
    },
    goldseat4d:{
        type: String,
    },
    goldseat:{
        type: String,
    },
    regular:{
        type: String,
    },
    quantity:{
        type:Number,
    },
    subtotal:{
        type:Number,
    }
}
)

const movies = mongoose.model('movies', movieSchema)

module.exports = movies;