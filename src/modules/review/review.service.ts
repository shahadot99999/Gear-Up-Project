import { prisma } from '../../lib/prisma';

interface ICreateReviewPayload {
  gearItemId: string;
  rating: number;
  comment?: string;
}

const createReview = async (customerId: string, payload: ICreateReviewPayload) => {
  const { gearItemId, rating, comment } = payload;

  
  const gearItem = await prisma.gearItem.findUnique({
    where: { id: gearItemId },
  });

  if (!gearItem) {
    throw new Error('Gear item not found');
  }

  
  const review = await prisma.review.create({
    data: {
      customerId,
      gearItemId,
      rating: Number(rating),
      comment,
    },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      gearItem: true,
    },
  });

  return review;
};

export const reviewService = {
  createReview,
};