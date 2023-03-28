import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    original_price: {
        type: Number
    },
    descript: {
        type: String
    }
});

export default mongoose.model('Product', productSchema);