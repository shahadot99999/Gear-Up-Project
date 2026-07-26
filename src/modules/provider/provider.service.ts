import { prisma } from "../../lib/prisma";

const addGear = async (payload: any, userId: string) => {
    return await prisma.gearItem.create({
        data: {
            ...payload,
            providerId: userId
        }
    });
};

const updateGear = async (id: string, payload: any, userId: string) => {
    
    const existingGear = await prisma.gearItem.findUnique({ where: { id } });
    if (!existingGear || existingGear.providerId !== userId) {
        throw new Error("Unauthorized or gear item not found");
    }

    return await prisma.gearItem.update({
        where: { id },
        data: payload
    });
};

const deleteGear = async (id: string, userId: string) => {
   
    return await prisma.gearItem.delete({
        where: { id }
    });
};

const getIncomingOrders = async (userId: string) => {
  return await prisma.rentalOrder.findMany({
    where: {
      gearItem: {
        providerId: userId,
      },
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
      payments: true,
    },
  });
};

const updateOrderStatus = async (id: string, status: any, userId: string) => {
  const order = await prisma.rentalOrder.findUnique({
    where: { id },
    include: { gearItem: true },
  });

  if (!order || order.gearItem.providerId !== userId) {
    throw new Error("Unauthorized or rental order not found");
  }

  return await prisma.rentalOrder.update({
    where: { id },
    data: { status },
  });
};

export const providerService = {
    addGear,
    updateGear,
    deleteGear,
    getIncomingOrders,
    updateOrderStatus
};