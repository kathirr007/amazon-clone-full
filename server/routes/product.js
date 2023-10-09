import express from 'express'
const router = express.Router();
import Product from '../models/product.js'

import {upload} from '../middlewares/upload-photo.js'

// POST request - create a new product
router.post('/products', upload.array('prodImages', 3), async (req, res) => {
    debugger
    try {
        let prodImages = req.files.map((file) => {
            return {
                    location: file.location,
                    size: file.size,
                    originalname: file.originalname,
                   }
        })

        let product = new Product()

        product.owner = req.body.ownerID
        product.category = req.body.categoryID
        product.price = req.body.price
        product.title = req.body.title
        product.description = req.body.description
        product.stockQuantity = req.body.stockQuantity
        product.photo = req.files.length !=0 ? req.files[0].location : ''
        product.prodImages = req.files.length !=0 ? prodImages : []

        await product.save()

        // console.log(product)
        res.json({
            status: true,
            message: 'Product is Successfully saved..',
            prodImages
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

/* router.post('/upload', upload.array('prodImages', 3), (req, res) => {
    if (!req.files) res.status(400).json({ error: 'No files were uploaded.' })
    console.log(req.files)
    res.status(201).json({
      message: 'Successfully uploaded ' + req.files.length + ' files!',
      files: req.files
    })
  }) */

// GET request - get all products
router.get('/products', async(req,res) => {
    try {
        let products = await Product.find()
            .populate('owner category')
            .populate('reviews', 'rating')
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
// /api/products/123wr323
router.get('/products/:id', async(req,res) => {
    try {
        let product = await Product.findOne({ _id: req.params.id })
            .populate('owner category')
            .populate('reviews', 'rating')
            .then((product) => product)
            .catch((err) => {
              console.log(err);
            });
        res.json({
            success: true,
            product: product
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// PUT request - Update a single product
router.put("/products/:id", upload.array("prodImages"), async (req, res) => {
  debugger
  try {
    let prodImages = req.files? req.files.map((file) => {
        return {
                location: file.location,
                size: file.size,
                originalname: file.originalname,
                }
    }) : []
    let updateQuery = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        stockQuantity: req.body.stockQuantity,
        category: req.body.categoryID,
        owner: req.body.ownerID,
    }
    if(req.files.length !=0) {
        updateQuery.photo = req.files[0].location
        updateQuery.prodImages = prodImages
    }
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: updateQuery
      },
      { upsert: true }
    );
    res.json({
      success: true,
      updatedProduct: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// DELETE request - delete a single product
router.delete('/products/:id', async(req,res) => {
    try {
        let deletedProduct = await Product.findOneAndDelete({ _id: req.params.id })
        if(deletedProduct) {
            res.json({
                status: true,
                message: "Product is successfully deleted..."
            })
        }
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


export default router
