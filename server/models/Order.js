const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        pincode: String
    },
    paymentInfo: {
        id: String,
        status: String,
        method: String
    },
    totalPrice: { type: Number, required: true },
    orderStatus: { type: String, enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Processing' },
    deliveredAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
