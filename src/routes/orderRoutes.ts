import { Router } from 'express';
import { createOrder, getOrders, advanceOrder } from '../controllers/orderController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrder'
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid data or missing services
 *       401:
 *         description: Unauthorized
 */
router.post('/', createOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: List orders with pagination
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *           enum: [CREATED, ANALYSIS, COMPLETED]
 *         description: Filter by state
 *     responses:
 *       200:
 *         description: List of orders
 *       401:
 *         description: Unauthorized
 */
router.get('/', getOrders);

/**
 * @swagger
 * /orders/{id}/advance:
 *   patch:
 *     summary: Advance order state
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order state advanced
 *       400:
 *         description: Cannot advance (already completed or deleted)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 */
router.patch('/:id/advance', advanceOrder);

export default router;
