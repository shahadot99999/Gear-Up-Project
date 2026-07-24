

import { prisma } from '../../lib/prisma';
import { stripe } from '../../lib/stripe';
import config from '../../config';

const createPaymentIntent = async (rentalOrderId: string) => {
  
  const order = await prisma.rentalOrder.findUnique({
    where: { id: rentalOrderId },
  });

  if (!order) {
    throw new Error('Rental order not found');
  }

  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(order.totalPrice * 100),
    currency: 'usd',
    metadata: { rentalOrderId },
  });

  
  const newPayment = await prisma.payment.create({
    data: {
      rentalOrderId: order.id,
      amount: order.totalPrice,
      method: 'stripe',
      provider: 'stripe',
      transactionId: paymentIntent.id,
      status: 'COMPLETED',
      paidAt: new Date(),
    },
  });

  
  await prisma.rentalOrder.update({
    where: { id: rentalOrderId },
    data: { status: 'CONFIRMED' },
  });

  return {
    paymentId: newPayment.id,
    clientSecret: paymentIntent.client_secret,
    transactionId: paymentIntent.id,
    totalPrice: order.totalPrice,
  };
};

const handleWebhook = async (rawBody: Buffer, signature: string) => {
  return { received: true };
};

const getHistory = async (userId: string) => {
  return await prisma.payment.findMany({
    where: {
      rentalOrder: {
        customerId: userId,
      },
    },
    include: {
      rentalOrder: true,
    },
  });
};

const getDetails = async (id: string) => {
  return await prisma.payment.findUnique({
    where: { id },
    include: {
      rentalOrder: true,
    },
  });
};

const confirmPayment = async (paymentIntentId: string) => {
  
  const payment = await prisma.payment.findFirst({
   where: {
      OR: [
        { transactionId: paymentIntentId },
        { id: paymentIntentId },
      ],
    },
  });

  if (!payment) {
    throw new Error(`Payment record with transaction ID ${paymentIntentId} not found in database`);
  }

  
  const updatedPayment = await prisma.payment.update({
    where: { id: payment.id },
    data: {
      status: 'COMPLETED',
      paidAt: new Date(),
    },
  });

  return updatedPayment;
};

export const paymentService = {
  createPaymentIntent,
  confirmPayment,
  handleWebhook,
  getHistory,
  getDetails,
};