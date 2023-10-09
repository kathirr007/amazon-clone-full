import mongoose from 'mongoose'
const Schema = mongoose.Schema

const AddressSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    country: String,
    fullName: String,
    streetAddress: String,
    city: String,
    state: String,
    zipCode: String,
    phoneNumber: String,
    deliveryInstructions: String,
    securityCode: String,
})

export default mongoose.model('Address', AddressSchema)
