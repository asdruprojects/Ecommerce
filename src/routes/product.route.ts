import { Router } from 'express';
import {
    getAvailableProducts,
    getProductById,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller';

import { asyncHandler } from '../middlewares/async-handler.middleware';
import { checkPermissionAuth } from '../middlewares/check-permission.middleware'; // middleware autorización por permiso
import { validateCreateProduct, validateUpdateProduct } from '../validators/product.validator';

const router = Router();

//Rutas públicas
router.get('/', asyncHandler(getAvailableProducts)); 
router.get('/:id', asyncHandler(getProductById));

//Rutas administrativas
router 
    .route('/admin')
    .get(checkPermissionAuth('get_all_products'), asyncHandler(getAllProducts))
    .post(checkPermissionAuth('create_product'), validateCreateProduct, asyncHandler(createProduct));
router
    .route('/admin/:id')
    .patch(checkPermissionAuth('update_product'), validateUpdateProduct, asyncHandler(updateProduct))
    .delete(checkPermissionAuth('delete_product'), asyncHandler(deleteProduct));

export default router;