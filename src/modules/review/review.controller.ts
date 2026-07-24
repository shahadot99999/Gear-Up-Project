import { Request, Response } from 'express';
import { reviewService } from './review.service';

const createReview = async (req: Request, res: Response) => {
  try {
    const customerId = (req as any).user?.id; 
    const result = await reviewService.createReview(customerId, req.body);

    res.status(201).json({
      success: true,
      message: 'Review created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to create review',
      error: error.message,
    });
  }
};

export const reviewController = {
  createReview,
};