import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    headline: String,
    body: String,
    rating: Number,
    photo: String,
    productID: { type: Schema.Types.ObjectId, ref: 'Product'},
    user: { type: Schema.Types.ObjectId, ref: 'User'},
})

export default mongoose.model('Review', ReviewSchema)
