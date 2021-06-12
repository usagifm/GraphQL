const mongoose = require('mongoose')


// user model defines what user will look like
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false 
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,

        // Reges to validate the email
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email",
        ]
    },
    


}, {timestamps: true})

module.exports = mongoose.model('user', userSchema)