import { Router } from 'express';
import { createOrder, getOrders, advanceOrder } from '../controllers/orderController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.post('/', createOrder);
router.get('/', getOrders);
router.patch('/:id/advance', advanceOrder);

export default router;

