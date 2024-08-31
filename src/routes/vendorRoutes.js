const express = require('express');
const router = express.Router();
const {
    createVendor, getAllVendors, getVendorById,
    updateVendor, deleteVendor, getVendorPerformance
} = require('../controllers/vendorController.js');
const { authenticateToken } = require('../middleware/auth.js');

router.post('/', authenticateToken, createVendor);
router.get('/', authenticateToken, getAllVendors);
router.get('/:vendorId', authenticateToken, getVendorById);
router.put('/:vendorId', authenticateToken, updateVendor);
router.delete('/:vendorId', authenticateToken, deleteVendor);
router.get('/:vendorId/performance', authenticateToken, getVendorPerformance);

module.exports = router;
