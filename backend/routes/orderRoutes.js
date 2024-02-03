import express from 'express';
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    getOrders,
    updateOrderToDelivered,
} from '../controllers/orderControllers.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, isAdmin, getOrders);
router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, isAdmin, updateOrderToDelivered);

export default router;
