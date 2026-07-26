import { prisma } from '../../lib/prisma';


const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return users;
};


const updateUserStatus = async (userId: string, isActive: boolean) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { isActive },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
    },
  });

  return updatedUser;
};


const getAllGear = async () => {
  const gearItems = await prisma.gearItem.findMany({
    include: {
      provider: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      category: true,
    },
  });
  return gearItems;
};


const getAllRentals = async () => {
  const rentals = await prisma.rentalOrder.findMany({
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
  return rentals;
};

export const adminService = {
  getAllUsers,
  updateUserStatus,
  getAllGear,
  getAllRentals,
};