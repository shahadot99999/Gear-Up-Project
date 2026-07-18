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
    // Validate ownership before updating
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

// const getIncomingOrders = async (userId: string) => {
//     // Looks up rental orders containing gear that belongs to this specific provider
//     return await prisma.rentalOrder.findMany({
//         where: {
//             rentals: {
//                 some: {
//                     providerId: userId
//                 }
//             }
//         },
//         include: {
//             user: { select: { name: true, email: true } }
//         }
//     });
// };

const updateOrderStatus = async (id: string, status: any, userId: string) => {
    // Updates global rental workflow status
    return await prisma.rentalOrder.update({
        where: { id },
        data: { status }
    });
};

export const providerService = {
    addGear,
    updateGear,
    deleteGear,
    //getIncomingOrders,
    updateOrderStatus
};