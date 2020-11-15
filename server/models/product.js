const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongooseAlgolia = require('mongoose-algolia')

const ProductSchema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: 'Category'},
    owner: { type: Schema.Types.ObjectId, ref: 'Owner'},
    title: String,
    description: String,
    photo: String,
    prodImages: Array,
    price: Number,
    stockQuantity: Number,
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})

ProductSchema.virtual('averageRating').get(function() {
    if(this.reviews.length > 0) {
        let sum = this.reviews.reduce((total, review) => {
            return total + review.rating  
        }, 0)
        return sum / this.reviews.length
    }
    return 0
})

ProductSchema.plugin(mongooseAlgolia, {
    appId: process.env.ALGOLIA_APP_ID,
    apiKey: process.env.ALGOLIA_SECRET,
    indexName: process.env.ALGOLIA_INDEX,

    selector: 'title _id photo description price rating averageRating owner category',
    populate: {
        path: 'owner reviews category',
        // select: 'name'
    },
    debug: true
})

let Model = mongoose.model('Product', ProductSchema)
Model.SyncToAlgolia()
Model.SetAlgoliaSettings({
    searchableAttributes: ['title', 'category', 'averageRating', 'price']
})

module.exports = Model