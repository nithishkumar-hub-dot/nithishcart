const express = require('express');
const router = express.Router();
const {
    createOrderCheckout,
    verifyOrderPayment,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderToDelivered,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, admin, getOrders);
router.route('/checkout').post(protect, createOrderCheckout);
router.route('/verify').post(protect, verifyOrderPayment);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

module.exports = router;
