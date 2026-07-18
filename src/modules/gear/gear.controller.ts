import { Request, Response } from "express";
import { gearService } from "./gear.service";

// Controller for POST /api/gears
const createGear = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        const userId = (req as any).user?.id; 

        const result = await gearService.createGear(payload, userId);

        res.status(201).json({
            success: true,
            message: "Gear item created successfully!",
            data: result
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to create gear item",
            errorDetails: error.message || error
        });
    }
};

// Controller for GET /api/gears (with filtering)
const getAllGear = async (req: Request, res: Response) => {
    try {
        // Collects query params from Postman like ?brand=Trek or ?maxPrice=50
        const filters = req.query;
        const result = await gearService.getAllGear(filters);

        res.status(200).json({
            success: true,
            message: "Gear items fetched successfully!",
            data: result
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch gear items",
            errorDetails: error.message || error
        });
    }
};

// Controller for GET /api/gears/:id
const getGearById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await gearService.getGearById(id as string);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Gear item not found",
                errorDetails: `No gear item found with ID: ${id}`
            });
        }

        res.status(200).json({
            success: true,
            message: "Gear details fetched successfully!",
            data: result
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch gear details",
            errorDetails: error.message || error
        });
    }
};

export const gearController = {
    createGear,
    getAllGear,
    getGearById
};