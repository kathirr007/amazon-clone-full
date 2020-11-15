const router = require('express').Router()
const Category = require('../models/category')

// const upload = require('../middlewares/upload-photo')

// POST request - create a new category
router.post('/categories', async (req, res) => {
    try {
        let category = new Category()
        category.type = req.body.type

        let newCategory = await category.save()
        // let newCategory = await category.insertOne()

        res.json({
            status: true,
            catAdded: newCategory,
            message: 'Category is created Successfully...'
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// GET request - get categories
router.get('/categories', async(req,res) => {
    try {
        let categories = await Category.find()
        res.json({
            success: true,
            categories: categories
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


// DELETE request - delete a single category
router.delete('/categories/:id', async(req,res) => {
  try {
      let deletedCategory = await Category.findOneAndDelete({ _id: req.params.id })
      if(deletedCategory) {
          res.json({
              status: true,
              message: "Category is successfully deleted..."
          })
      }
  } catch(err) {
      res.status(500).json({
          success: false,
          message: err.message
      })
  }
})

module.exports = router
