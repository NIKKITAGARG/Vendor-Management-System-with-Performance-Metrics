const express = require('express');
const mongoose = require('mongoose');
const { port, mongoUri } = require('./config');

const app = express();
app.use(express.json());

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Import routes
const vendorRoutes = require('./routes/vendorRoutes.js');
const purchaseOrderRoutes = require('./routes/purchaseOrderRoutes.js');
const authRoutes = require('./routes/authRoutes.js');

// Use routes
app.use('/auth', authRoutes);
app.use('/vendors', vendorRoutes);
app.use('/purchase-orders', purchaseOrderRoutes);

module.exports = app;
app.listen(port, () => console.log(`Server running on port ${port}`));
