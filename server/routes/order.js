import express from 'express'
const router = express.Router();
import Order from '../models/order.js'
import verifyToken from '../middlewares/verify-token.js'

// const upload = require('../middlewares/upload-photo')

// POST request - create a order


// GET request - get orders
router.get('/orders', verifyToken, async(req,res) => {
    try {
        let products = await Order.find({ owner: req.decoded._id }).deepPopulate('owner products.productID.owner')
        .then((products) => products)
        .catch((err) => {
          console.log(err);
        });
        res.json({
            success: true,
            products: products
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// GET request - get a single product

// PUT request - Update a single product

// DELETE request - delete a single product

export default router
