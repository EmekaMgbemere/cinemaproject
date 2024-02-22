const mongoose = require("mongoose")

const postSchema = ({
    content: {
        type: String,
    },
    topic: {
        type: String,
    },
    message: {
        type: String,
    },
    image: {
        type: String,
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }],
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }]
}
// , {
//     timestamps: true
// }
)

const post = mongoose.model('post', postSchema)

module.exports = post;