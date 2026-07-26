import { prisma } from '../../lib/prisma';

// 1. Get all users
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

// 2. Update user status (suspend/activate)
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

// 3. Get all gear listings
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

// 4. Get all rental orders
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