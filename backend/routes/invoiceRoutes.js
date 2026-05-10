const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

// Get all invoices
router.get('/', async (req, res) => {
    try {
        const invoices = await Invoice.find().sort({ date: -1 });
        res.json(invoices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new invoice with AI Analysis
router.post('/', async (req, res) => {
    const { customerName, items, grandTotal } = req.body;
    
    // Simple AI Analysis simulation
    const aiFlags = {
        isDuplicate: false, // In real app, check against DB
        unusualAmount: grandTotal > 500000,
        gstMismatch: items.some(i => i.gstRate !== 18 && i.name.toLowerCase().includes('laptop')),
        analysisNote: grandTotal > 500000 ? 'Flagged for manual audit due to high value.' : 'Automated check passed.'
    };

    const invoice = new Invoice({
        ...req.body,
        invoiceNumber: `INV-${Date.now()}`,
        aiFlags
    });

    try {
        const newInvoice = await invoice.save();
        res.status(201).json(newInvoice);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
