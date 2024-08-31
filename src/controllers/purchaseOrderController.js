const PurchaseOrder = require('../models/PurchaseOrder.js');
const Vendor = require('../models/vendor');
const {updateVendorPerformance} = require('../controllers/vendorController.js')

// Create a new purchase order
exports.createPurchaseOrder = async (req, res) => {
    try {
        const purchaseOrder = new PurchaseOrder(req.body);
        await purchaseOrder.save();
        res.status(201).json(purchaseOrder);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// List all purchase orders with optional vendor filter
exports.getAllPurchaseOrders = async (req, res) => {
    try {
        const filter = req.query.vendorId ? { vendor: req.query.vendorId } : {};
        const purchaseOrders = await PurchaseOrder.find(filter).populate('vendor');
        res.status(200).json(purchaseOrders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Retrieve a specific purchase order
exports.getPurchaseOrderById = async (req, res) => {
    try {
        const purchaseOrder = await PurchaseOrder.findById(req.params.poId).populate('vendor');
        if (!purchaseOrder) return res.status(404).json({ error: 'Purchase order not found' });
        res.status(200).json(purchaseOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a purchase order
exports.updatePurchaseOrder = async (req, res) => {
    try {
        const purchaseOrder = await PurchaseOrder.findByIdAndUpdate(req.params.poId, {$set:req.body}, { new: true, runValidators: true });
        if (!purchaseOrder) return res.status(404).json({ error: 'Purchase order not found' });
        res.status(200).json(purchaseOrder);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a purchase order
exports.deletePurchaseOrder = async (req, res) => {
    try {
        const purchaseOrder = await PurchaseOrder.findByIdAndDelete(req.params.poId);
        if (!purchaseOrder) return res.status(404).json({ error: 'Purchase order not found' });
        res.status(200).json({ message: 'Purchase order deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Vendor acknowledges a purchase order
exports.acknowledgePurchaseOrder = async (req, res) => {
    try {
        const { poId } = req.params;
        const purchaseOrder = await PurchaseOrder.findById(poId);

        if (!purchaseOrder) {
            return res.status(404).json({ error: 'Purchase order not found' });
        }

        purchaseOrder.acknowledgmentDate = new Date();
        await purchaseOrder.save();

        // Update the vendor's performance metrics
        await updateVendorPerformance(purchaseOrder.vendor);

        res.status(200).json(purchaseOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
