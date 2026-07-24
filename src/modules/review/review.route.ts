import { Router } from 'express';
import { reviewController } from './review.controller';
import { auth } from '../../middlewares/auth';

const router = Router();

// POST /api/reviews -> Create review (requires auth)
router.post('/', auth(), reviewController.createReview);

export const reviewRoutes = router;