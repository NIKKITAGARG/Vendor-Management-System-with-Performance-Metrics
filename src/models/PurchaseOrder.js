const mongoose = require('mongoose');
const { generatePONumber } = require('../utils/codeUtils');

const poSchema = new mongoose.Schema({
    poNumber: { type: String, unique: true, default: generatePONumber() },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    orderDate: { type: Date, required: true },
    deliveryDate: { type: Date, required: true },
    items: { type: Array, required: true },
    quantity: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'canceled'], default: 'pending' },
    qualityRating: { type: Number, min: 0, max: 5, default: null },
    issueDate: { type: Date, required: true },
    acknowledgmentDate: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('PurchaseOrder', poSchema);
