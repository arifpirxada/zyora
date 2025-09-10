import { Router } from 'express';
import productController from './product.controller';
import auth from '../../../middlewares/auth.middleware';

const router = Router();

router.get('/', productController.getProducts);

router.get('/me', auth, productController.getMyProducts)

router.get('/:id', productController.getSingleProduct);

router.post('/', auth, productController.createProduct);

router.put('/:id/like', auth, productController.likeProduct);

router.post('/:id/comment', auth, productController.addComment);

export default router;