import { Request, Response } from "express";
import { rentalService } from "./rental.service";

const createRentalOrder = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        const customerId = (req as any).user?.id; // Extract logged-in customer ID

        const result = await rentalService.createRentalOrder(payload, customerId);
        res.status(201).json({
            success: true,
            message: "Rental order created successfully!",
            data: result
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to create rental order",
            errorDetails: error.message
        });
    }
};

const getUserRentals = async (req: Request, res: Response) => {
    try {
        const customerId = (req as any).user?.id;
        const result = await rentalService.getUserRentals(customerId);
        res.status(200).json({
            success: true,
            message: "User rental orders fetched successfully!",
            data: result
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch rental orders",
            errorDetails: error.message
        });
    }
};

const getRentalDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const customerId = (req as any).user?.id;

        const result = await rentalService.getRentalDetails(id as string, customerId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Rental order not found or unauthorized access"
            });
        }

        res.status(200).json({
            success: true,
            message: "Rental order details fetched successfully!",
            data: result
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch rental order details",
            errorDetails: error.message
        });
    }
};

export const rentalController = {
    createRentalOrder,
    getUserRentals,
    getRentalDetails
};