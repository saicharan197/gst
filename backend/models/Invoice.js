const mongoose = require('mongoose');

const invoiceItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    gstRate: { type: Number, required: true },
    gstAmount: { type: Number, required: true },
    total: { type: Number, required: true }
});

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String },
    items: [invoiceItemSchema],
    subTotal: { type: Number, required: true },
    totalGst: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
    paymentMethod: { type: String, enum: ['UPI', 'Cash', 'Card'], default: 'UPI' },
    date: { type: Date, default: Date.now },
    
    // AI Analysis Fields
    aiFlags: {
        isDuplicate: { type: Boolean, default: false },
        unusualAmount: { type: Boolean, default: false },
        gstMismatch: { type: Boolean, default: false },
        analysisNote: { type: String }
    }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
