import express from 'express'
const router = express.Router();
import Review from '../models/review.js'
import Product from '../models/product.js'
import verifyToken from '../middlewares/verify-token.js'
import {upload} from '../middlewares/upload-photo.js'

router.post('/reviews/:productID', [verifyToken, upload.single('photo')], async(req, res) => {
    try {
        const review = new Review()
        review.headline = req.body.headline
        review.body = req.body.body
        review.rating = req.body.rating
        review.photo = req.file ? req.file.location : ''
        review.user = req.decoded._id
        review.productID = req.params.productID

        await Product.update({_id: review.productID}, { $push: { reviews: review._id } })

        const savedReview = await review.save()

        if(savedReview) {
            res.json({
                success: true,
                message: 'Successfully added Review'
            })
        }

    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

router.get('/reviews/:productID', async(req,res) => {
    try {
        const productReviews = await Review.find({
            productID: req.params.productID
        })
        .populate('user')
        .then((reviews) => reviews)
        .catch((err) => {
          console.log(err);
        });

        res.json({
            success: true,
            reviews: productReviews
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

export default router
