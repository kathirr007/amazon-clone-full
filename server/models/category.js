import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    type: { type: String, unique: true, required: true }
})

export default mongoose.model('Category', CategorySchema)
