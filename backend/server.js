const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gst-billing').then(() => {
    console.log('🚀 Connected to MongoDB (Futuristic Node)');
}).catch(err => {
    console.warn('⚠️ MongoDB not available. Running in local-memory mode for demo.');
});

// Routes
app.use('/api/invoices', require('./routes/invoiceRoutes'));

// Basic Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the AI GST Billing System API', status: 'Active' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`✨ Server running on http://localhost:${PORT}`);
});
