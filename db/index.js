const mongoose = require('mongoose')

const connectToMongoDB = async () => { 
const conn = await mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true })
console.log('Succesfully connected to mongoDB')

}

module.exports = { connectToMongoDB }