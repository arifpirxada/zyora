import { Router } from 'express';
import productController from './product.controller';

const router = Router();

// router.get('/me', auth, userController.getUser);

router.post('/', productController.createProduct);

// router.post('/login', userController.loginUser);

// router.post('/logout', userController.logoutUser)

export default router;