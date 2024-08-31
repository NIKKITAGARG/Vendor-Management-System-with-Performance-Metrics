const express = require('express');
const router = express.Router();
const {
    createPurchaseOrder, getAllPurchaseOrders, getPurchaseOrderById,
    updatePurchaseOrder, deletePurchaseOrder, acknowledgePurchaseOrder
} = require('../controllers/purchaseOrderController');
const { authenticateToken } = require('../middleware/auth.js');

router.post('/', authenticateToken, createPurchaseOrder);
router.get('/', authenticateToken, getAllPurchaseOrders);
router.get('/:poId', authenticateToken, getPurchaseOrderById);
router.put('/:poId', authenticateToken, updatePurchaseOrder);
router.delete('/:poId', authenticateToken, deletePurchaseOrder);
router.post('/:poId/acknowledge', authenticateToken, acknowledgePurchaseOrder);

module.exports = router;
