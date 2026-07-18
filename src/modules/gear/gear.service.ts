import { prisma } from "../../lib/prisma";
import { ICreateGearPayload } from "./gear.interface";

const createGear = async (payload: ICreateGearPayload, userId: string) => {
    const result = await prisma.gearItem.create({
        data: {
            ...payload,
            providerId: userId
        }
    });
    return result;
};

const getAllGear = async (filters: any) => {
    const { category, brand, maxPrice } = filters;
    const whereConditions: any = {};

    // 1. Filter by categoryId
    if (category) {
        whereConditions.categoryId = category;
    }

    // 2. Filter by brand (case-insensitive keyword match)
    if (brand) {
        whereConditions.brand = {
            contains: brand,
            mode: "insensitive"
        };
    }

    // 3. Filter by maximum price (Less-Than-or-Equal-To)
    if (maxPrice) {
        whereConditions.pricePerDay = {
            lte: parseFloat(maxPrice)
        };
    }

    const result = await prisma.gearItem.findMany({
        where: whereConditions,
        include: {
            category: true
        }
    });
    
    return result;
};

const getGearById = async (id: string) => {
    const result = await prisma.gearItem.findUnique({
        where: { id },
        include: {
            category: true
        }
    });
    return result;
};

export const gearService = {
    createGear,
    getAllGear,
    getGearById
};