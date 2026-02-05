const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    category: { type: String, required: true },
    brand: { type: String },
    images: [{ type: String, required: true }],
    variants: [{
        type: { type: String }, // e.g., Size, Color
        value: { type: String }
    }],
    ratings: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
    reviews: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, required: true },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now }
    }],
    stock: { type: Number, default: 0 },
    isFestive: { type: Boolean, default: false },
    tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
