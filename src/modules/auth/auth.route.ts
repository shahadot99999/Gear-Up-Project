import { Router } from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser } from './auth.controller';
import { validate } from '../../middlewares/validate';

const router = Router();

router.post(
  '/register',
  validate([
    body('email').isEmail().withMessage('Invalid email format'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    body('name').notEmpty().withMessage('Name is required'),
    body('role')
      .isIn(['CUSTOMER', 'PROVIDER'])
      .withMessage('Role must be either CUSTOMER or PROVIDER'),
  ]),
  registerUser
);

router.post(
  '/login',
  validate([
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
  ]),
  loginUser
);

export default router;