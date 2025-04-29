require('dotenv').config()                      // for .env file.
const path = require('path')
const express = require("express")
const cookieParser = require('cookie-parser')

const router = require('./routes/routes.js')

require("./configs/mongoose.js")                // it makes a connection with mongoose in MongoDB database.

const app = express()
app.use(cookieParser())

// app.use(express.static('front-end'));
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//This will ensure that the request body is parsed correctly and available in req.body. 
// Therefore these must be before router.

app.use(router) 

// Server
const APP_PORT= process.env.PORT || 4001;
const server=app.listen(APP_PORT, () => {
    let { address, port } = server.address()
    if (address === '::') {
        address = 'localhost'
    }
    console.log(`Server is listening at http://${address}:${port}`)
});