import { Request, Response } from 'express';
import { paymentService } from './payment.service';

const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { rentalOrderId } = req.body;
    const result = await paymentService.createPaymentIntent(rentalOrderId);

    res.status(201).json({
      success: true,
      message: 'Payment Intent created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to create payment intent',
      error: error.message,
    });
  }
};

const stripeWebhook = async (req: Request, res: Response) => {
  try {
    const signature = req.headers['stripe-signature'] as string;
    
    if (!signature) {
      return res.status(400).json({ error: 'Missing stripe signature header' });
    }

    const result = await paymentService.handleWebhook(req.body, signature);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ 
      success: false, 
      message: 'Webhook processing error', 
      error: error.message 
    });
  }
};

const getUserPaymentHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id; // Assuming auth middleware injects user info
    const result = await paymentService.getHistory(userId);

    res.status(200).json({
      success: true,
      message: 'Payment history fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch history',
      error: error.message,
    });
  }
};

const getPaymentDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await paymentService.getDetails(id as string);

    if (!result) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Payment details fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment details',
      error: error.message,
    });
  }
};

const confirmPayment = async (req: Request, res: Response) => {
  try {
    const { paymentIntentId } = req.body || {};

    if (!paymentIntentId) {
      return res.status(400).json({
        success: false,
        message: 'paymentIntentId is required in request body',
      });
    }

    const result = await paymentService.confirmPayment(paymentIntentId);

    res.status(200).json({
      success: true,
      message: 'Payment confirmed successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to confirm payment',
      error: error.message,
    });
  }
};

export const paymentController = {
  createPaymentIntent,
  confirmPayment,
  stripeWebhook,
  getUserPaymentHistory,
  getPaymentDetails,
};