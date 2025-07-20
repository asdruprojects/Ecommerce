import { Router } from 'express';
import {
    createOrder,
    getUserOrders,
    getUserOrderById,
} from '../controllers/order.controller';
import { asyncHandler } from '../middlewares/async-handler.middleware';
import { checkPermissionAuth } from '../middlewares/check-permission.middleware';
import { validateCreateOrder } from '../validators/order.validator';

const router = Router();

router 
    .route('/')
    .get(checkPermissionAuth('get_own_orders'), asyncHandler(getUserOrders))
    .post(checkPermissionAuth('create_order'), validateCreateOrder, asyncHandler(createOrder));
router.get('/:id', checkPermissionAuth('get_own_orders'), asyncHandler(getUserOrderById));

export default router;