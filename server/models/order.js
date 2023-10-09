import mongoose from 'mongoose'
import deepPopulate  from 'mongoose-deep-populate'
// deepPopulate(mongoose)
// const deepPopulate = require('mongoose-deep-populate')(mongoose);

const Schema = mongoose.Schema

const OrderSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [
        {
            productID: {type: Schema.Types.ObjectId, ref: 'Product'},
            quantity: Number,
            price: Number
        }
    ],
    estimatedDelivery: String
})

// deepPopulate(OrderSchema)

OrderSchema.plugin(deepPopulate)

export default mongoose.model('Order', OrderSchema)
