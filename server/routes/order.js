const router = require('express').Router()
const Order = require('../models/order')
const verifyToken = require('../middlewares/verify-token')

// const upload = require('../middlewares/upload-photo')

// POST request - create a order


// GET request - get orders
router.get('/orders', verifyToken, async(req,res) => {
    try {
        let products = await Order.find({ owner: req.decoded._id }).deepPopulate('owner products.productID.owner').exec()
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

module.exports = router