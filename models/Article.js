const mongoose = require('mongoose')


// article model defines what article will look like
const articleSchema = new mongoose.Schema({

    authorId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,

    },
   
    


}, {timestamps: true})

module.exports = mongoose.model('article', articleSchema)