import { prisma } from "../../lib/prisma";

const createRentalOrder = async (payload: any, customerId: string) => {
    const { gearItemId, startDate, endDate, totalPrice } = payload;

    // Check if the gear item actually exists and is available
    const gearItem = await prisma.gearItem.findUnique({ where: { id: gearItemId } });
    if (!gearItem) {
        throw new Error("The requested gear item does not exist.");
    }
    if (!gearItem.availability) {
        throw new Error("This gear item is currently unavailable for rent.");
    }

    return await prisma.rentalOrder.create({
        data: {
            customerId,
            gearItemId,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            totalPrice: parseFloat(totalPrice),
            status: "PENDING"
        },
        include: {
            gearItem: true
        }
    });
};

const getUserRentals = async (customerId: string) => {
    return await prisma.rentalOrder.findMany({
        where: { customerId },
        include: {
            gearItem: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};

const getRentalDetails = async (id: string, customerId: string) => {
    return await prisma.rentalOrder.findFirst({
        where: {
            id,
            customerId 
        },
        include: {
            gearItem: true
        }
    });
};

export const rentalService = {
    createRentalOrder,
    getUserRentals,
    getRentalDetails
};