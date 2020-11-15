const router = require('express').Router()
const algoliaSearch = require('algoliasearch')

const client = algoliaSearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_SECRET
)

/* const fetchProducts = () => {
  const products = router.get('/products', async (req, res) => {
    try {
      let products = await Product.find()
        .populate('owner category')
        .populate('reviews', 'rating')
        .exec()
      res.json({
        success: true,
        products: products
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      })
    }
  })
  return products;
}
const products = fetchProducts() */

const index = client.initIndex(process.env.ALGOLIA_INDEX)

/* index.replaceAllObjects(products).then(({ objectIDs }) => {
  console.log(objectIDs);
}); */

// POST request - create search using Algolia
router.post('/search', async (req,res) => {
    const queries = [{
        indexName: process.env.ALGOLIA_INDEX,
        query: 'search in products index',
        params: {
          hitsPerPage: 3
        }
      }];
      
      
    try {
        let result = await index.search(req.body.title)
        /* let results = await client.multipleQueries(queries).then(({ results }) => {
            console.log(results);
          }); */
        
        res.json(result.hits)
        
    } catch(err) {
        res.json({
            success: false,
            message: err.message
        })
    }
})


// GET request - get categories


// GET request - get a single product

// PUT request - Update a single product

// DELETE request - delete a single product

module.exports = router