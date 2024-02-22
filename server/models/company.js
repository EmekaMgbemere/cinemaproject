const mongoose = require("mongoose")

const companySchema = ({
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
    avatar: {
        type: String,
        required: true,
        default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
    },
    details: {
        type: String,
        required: true,
    }
})

const company = mongoose.model('company', companySchema)

module.exports = company;