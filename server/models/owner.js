import mongoose from 'mongoose'
const Schema = mongoose.Schema

const OwnerSchema = new Schema({
    name: String,
    about: String,
    photo: String,
})

export default mongoose.model('Owner', OwnerSchema)
