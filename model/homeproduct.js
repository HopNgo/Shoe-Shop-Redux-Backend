import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);


const homeproductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    costOld: { type: String, required: true },
    costNew: { type: String, required: true },
    img: { type: String, required: true },
    type: { type: String },
    gender: { type: String, required: true },
    brand: { type: String, required: true },
    slug: { type: String, slug: 'name' },
})

export const homeproductModel = mongoose.model('homeproduct', homeproductSchema);