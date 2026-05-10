const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    gstRate: { type: Number, required: true }, // e.g., 18
    stock: { type: Number, default: 0 },
    lowStockThreshold: { type: Number, default: 10 },
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
