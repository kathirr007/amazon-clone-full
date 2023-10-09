import  express from 'express';
import  morgan from 'morgan';
import  bodyParser from 'body-parser';
import  mongoose from 'mongoose';
import  dotenv from 'dotenv';
import  cors from 'cors';
import User  from '../models/user.js'

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


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
import productRoutes from './product.js'
import categoryRoutes from './category.js'
import ownerRoutes from './owner.js'
import userRoutes from './auth.js'
import reviewRoutes from './review.js'
import addressRoutes from './address.js'
import paymentRoutes from './payment.js'
import orderRoutes from './order.js'
import searchRoutes from './search.js'

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

export default {
  path: '/api',
  handler: app
}


