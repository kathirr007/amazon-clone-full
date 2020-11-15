const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const User = require('./models/user')

dotenv.config()

const app = express()

debugger
mongoose.connect(process.env.DATABASEURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
err => {
    if(err) {
        console.log(err)
    } else {
        console.log('Connected to the database')
    }
})

// Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// require APIs
const productRoutes = require('./routes/product')
const categoryRoutes = require('./routes/category')
const ownerRoutes = require('./routes/owner')
const userRoutes = require('./routes/auth')
const reviewRoutes = require('./routes/review')
const addressRoutes = require('./routes/address')
const paymentRoutes = require('./routes/payment')
const orderRoutes = require('./routes/order')
const searchRoutes = require('./routes/search')

app.use('/api', productRoutes)
app.use('/api', categoryRoutes)
app.use('/api', ownerRoutes)
app.use('/api', userRoutes)
app.use('/api', reviewRoutes)
app.use('/api', addressRoutes)
app.use('/api', paymentRoutes)
app.use('/api', orderRoutes)
app.use('/api', searchRoutes)


app.listen(4004, err => {
    if(err) {
        console.log(err)
    } else {
        console.log('Listening on PORT', 4004)
    }
})