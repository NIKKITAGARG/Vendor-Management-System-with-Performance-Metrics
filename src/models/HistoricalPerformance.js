const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historicalPerformanceSchema = new Schema({
    vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
    date: { type: Date, default: Date.now, required: true },
    onTimeDeliveryRate: { type: Number, required: true },
    qualityRatingAvg: { type: Number, required: true },
    averageResponseTime: { type: Number, required: true },
    fulfillmentRate: { type: Number, required: true },
});

module.exports = mongoose.model('HistoricalPerformance', historicalPerformanceSchema);
