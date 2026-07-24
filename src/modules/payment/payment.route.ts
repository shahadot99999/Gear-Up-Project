import { Router } from 'express';
import { paymentController } from './payment.controller';
import { auth } from '../../middlewares/auth';

const router = Router();




router.post('/create', auth(), paymentController.createPaymentIntent);



router.post('/confirm', auth(), paymentController.confirmPayment);


router.get('/', auth(), paymentController.getUserPaymentHistory);


router.get('/:id', auth(), paymentController.getPaymentDetails);

export const paymentRoutes = router;