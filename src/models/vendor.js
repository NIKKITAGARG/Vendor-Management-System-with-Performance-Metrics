const mongoose = require('mongoose');
const { generateVendorCode } = require('../utils/codeUtils');

const vendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactDetails: { type: String, unique: true, required: true },
    address: { type: String, required: true },
    vendorCode: { type: String, unique: true, default: generateVendorCode() },
    onTimeDeliveryRate: { type: Number, default: 0 },
    qualityRatingAvg: { type: Number, default: 0 },
    averageResponseTime: { type: Number, default: 0 },
    fulfillmentRate: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Vendor', vendorSchema);
