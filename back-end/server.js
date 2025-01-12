require('dotenv').config()

const express = require('express')
const app = express()
//const port = process.env.PORT
const path = require('path')
let port = 8080
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const router = require('./routes/api')

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')

    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()  
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))


app.use(express.static(path.join(__dirname, 'public/main-layout')))
app.use(express.static(path.join(__dirname, 'public')))

mongoose.connect('mongodb://localhost/Itrip', {
    useNewUrlParser: true
}).then(() => {
    mongoose.set('useFindAndModify', false);

    app.use('/', router)

    




    app.listen(port, () => console.log(`Running server on port ${port}`))
})