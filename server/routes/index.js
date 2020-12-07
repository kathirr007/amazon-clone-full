const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const User = require('../models/user')

dotenv.config()

const app = express()

// debugger
mongoose.connect(process.env.DATABASEURI, err => {
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
const productRoutes = require('./product')
const categoryRoutes = require('./category')
const ownerRoutes = require('./owner')
const userRoutes = require('./auth')
const reviewRoutes = require('./review')
const addressRoutes = require('./address')
const paymentRoutes = require('./payment')
const orderRoutes = require('./order')
const searchRoutes = require('./search')

app.use(productRoutes)
app.use(categoryRoutes)
app.use(ownerRoutes)
app.use(userRoutes)
app.use(reviewRoutes)
app.use(addressRoutes)
app.use(paymentRoutes)
app.use(orderRoutes)
app.use(searchRoutes)

// Routers registeration
// app.use('', apiRoutes);
// app.use('/product-heroes', productHeroRoutes);
// app.use('/users', usersRoutes);
// app.use('/products', productRoutes);
// app.use('/categories', categoryRoutes);
// app.use('/blogs', blogRoutes);

module.exports = {
  path: '/api',
  handler: app
}


