import { Router } from 'express';
import userController from './user.controller';
import auth from '../../../middlewares/auth.middleware';
import storage from '../../../libraries/multer';
import multer from 'multer';

const upload = multer({
  storage
});

const router = Router();

router.get('/me', auth, userController.getUser);

router.post('/register', upload.single('photo'), userController.registerUser);

router.post('/login', userController.loginUser);

router.post('/logout', userController.logoutUser)

export default router;