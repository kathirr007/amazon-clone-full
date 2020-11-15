const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const User = require('./models/user')

dotenv.config()

const app = express()

mongoose.connect(process.env.DATABASEURI, { useNewUrlParser: true, useUnifiedTopology: true }, 
err => {
    if(err) {
        console.log(err)
    } else {
        console.log('Connected to the database')
    }
})

// Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// GET - Retrieve the data from the server
app.get('/', (req, res) => {
    res.json('Hello dear...')
})

// POST - Send data from frontend to the server
app.post('/', (req, res) => {
    let user = new User()
    user.name = req.body.name
    user.email = req.body.email
    user.password = req.body.password

    user.save(err => {
        if(err) {
            res.json(err)
        } else {
            res.json('new User is Successfully Saved')
        }
    })
})


app.listen(4000, err => {
    if(err) {
        console.log(err)
    } else {
        console.log('Listening on PORT', 4000)
    }
})