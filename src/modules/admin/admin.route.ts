import { Router } from 'express';
import { adminController } from './admin.controller';
import { auth } from '../../middlewares/auth';

const router = Router();

//admin route 
router.get('/users', auth('ADMIN'), adminController.getAllUsers);
router.patch('/users/:id', auth('ADMIN'), adminController.updateUserStatus);
router.get('/gear', auth('ADMIN'), adminController.getAllGear);
router.get('/rentals', auth('ADMIN'), adminController.getAllRentals);

export const adminRoutes = router;