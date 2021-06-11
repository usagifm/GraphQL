const express = require('express')
const dotenv = require('dotenv')
const app = express()

dotenv.config()

app.get('/', (req,res) => {
    res.json({msg:"KONTOL"})

})

app.listen(process.env.PORT, () =>{
    console.log(`Starting development server on port ${process.env.PORT} !`)
})