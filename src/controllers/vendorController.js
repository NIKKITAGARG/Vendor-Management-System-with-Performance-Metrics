const Vendor = require('../models/vendor.js');
const PurchaseOrder = require('../models/PurchaseOrder');
const HistoricalPerformance = require('../models/HistoricalPerformance');


// Create a new vendor
exports.updateVendorPerformance = async (vendorId) => {
    const vendor = await Vendor.findById(vendorId);
    const purchaseOrders = await PurchaseOrder.find({ vendor: vendorId });

    if (!vendor || !purchaseOrders.length) {
        return;
    }

    // Calculate On-Time Delivery Rate
    const completedOrders = purchaseOrders.filter(po => po.status === 'completed');
    const onTimeDeliveries = completedOrders.filter(po => new Date(po.deliveryDate) <= new Date(po.deliveryDate));
    vendor.onTimeDeliveryRate = (onTimeDeliveries.length / completedOrders.length) * 100;

    // Calculate Quality Rating Average
    const totalQualityRating = completedOrders.reduce((sum, po) => sum + (po.qualityRating || 0), 0);
    vendor.qualityRatingAvg = totalQualityRating / completedOrders.length;

    // Calculate Average Response Time
    const totalResponseTime = completedOrders.reduce((sum, po) => {
        if (po.acknowledgmentDate) {
            return sum + (new Date(po.acknowledgmentDate) - new Date(po.issueDate));
        }
        return sum;
    }, 0);
    vendor.averageResponseTime = totalResponseTime / completedOrders.length / (1000 * 60 * 60); // in hours

    // Calculate Fulfillment Rate
    const successfulOrders = completedOrders.filter(po => po.status === 'completed' && !po.issues);
    vendor.fulfillmentRate = (successfulOrders.length / purchaseOrders.length) * 100;

    await vendor.save();

    // Store historical data
    const historicalRecord = new HistoricalPerformance({
        vendor: vendorId,
        onTimeDeliveryRate: vendor.onTimeDeliveryRate,
        qualityRatingAvg: vendor.qualityRatingAvg,
        averageResponseTime: vendor.averageResponseTime,
        fulfillmentRate: vendor.fulfillmentRate,
    });

    await historicalRecord.save();
};

exports.getVendorPerformance = async (req, res) => {
    try {
        const { vendorId } = req.params;
        const vendor = await Vendor.findById(vendorId);

        if (!vendor) {
            return res.status(404).json({ error: 'Vendor not found' });
        }

        const performanceMetrics = {
            onTimeDeliveryRate: vendor.onTimeDeliveryRate,
            qualityRatingAvg: vendor.qualityRatingAvg,
            averageResponseTime: vendor.averageResponseTime,
            fulfillmentRate: vendor.fulfillmentRate,
        };

        res.status(200).json(performanceMetrics);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createVendor = async (req, res) => {
    try {
        const vendor = new Vendor(req.body);
        await vendor.save();
        res.status(201).json(vendor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// List all vendors
exports.getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.status(200).json(vendors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Retrieve a specific vendor
exports.getVendorById = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.vendorId);
        if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
        res.status(200).json(vendor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a vendor's details
exports.updateVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findByIdAndUpdate(req.params.vendorId, req.body, { new: true, runValidators: true });
        if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
        res.status(200).json(vendor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a vendor
exports.deleteVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findByIdAndDelete(req.params.vendorId);
        if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
        res.status(200).json({ message: 'Vendor deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
