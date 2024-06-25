const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Accepted', 'Canceled'], default: 'Pending' }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;