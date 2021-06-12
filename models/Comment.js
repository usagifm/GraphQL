const mongoose = require('mongoose')


// comment model defines what comment will look like
const commentSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
    },
    articleId: {
        type: String,
        required: true,

    },
    comment: {
        type: String,
        required: true
    },

}, {timestamps: true})

module.exports = mongoose.model('comment', commentSchema)