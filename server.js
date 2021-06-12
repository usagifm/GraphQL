const express = require('express')
const dotenv = require('dotenv')
const { connectToMongoDB } = require("./db")
const { graphqlHTTP } = require("express-graphql")
const schema = require("./graphql/schema")
const cors = require('cors')
const app = express()

dotenv.config()


const { createJWTToken } = require('./jwt/auth')
const { authenticate } = require('./middleware/auth')
connectToMongoDB()

app.use(authenticate)
app.use(cors())

app.get('/', (req,res) => {
    console.log(req.verify)
    res.json({msg:"welcome to GraphQL API! "})

})

app.get('/authcheck', (req, res)=>{
    res.json(createJWTToken({
        username: "test man",
        email: "teret@gmail.com",
        name: "Teteteqwer",
        role: "user"

    }))
})

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(process.env.PORT, () =>{
    console.log(`Starting development server on port ${process.env.PORT} !`)
})