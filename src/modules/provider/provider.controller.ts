import { Request, Response } from "express";
import { providerService } from "./provider.service";

const addGear = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        const userId = (req as any).user?.id; 

        const result = await providerService.addGear(payload, userId);
        res.status(201).json({
            success: true,
            message: "Gear added to inventory successfully!",
            data: result
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Failed to add gear", errorDetails: error.message });
    }
};

const updateGear = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const userId = (req as any).user?.id;

        const result = await providerService.updateGear(id as string, payload, userId);
        res.status(200).json({
            success: true,
            message: "Gear listing updated successfully!",
            data: result
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Failed to update gear", errorDetails: error.message });
    }
};

const deleteGear = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = (req as any).user?.id;

        await providerService.deleteGear(id as string, userId);
        res.status(200).json({
            success: true,
            message: "Gear removed from inventory successfully!",
            data: null
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Failed to remove gear", errorDetails: error.message });
    }
};

// const getIncomingOrders = async (req: Request, res: Response) => {
//     try {
//         const userId = (req as any).user?.id;
//         const result = await providerService.getIncomingOrders(userId);
//         res.status(200).json({
//             success: true,
//             message: "Incoming rental orders fetched successfully!",
//             data: result
//         });
//     } catch (error: any) {
//         res.status(500).json({ success: false, message: "Failed to fetch orders", errorDetails: error.message });
//     }
// };

const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const userId = (req as any).user?.id;

        const result = await providerService.updateOrderStatus(id as string, status, userId);
        res.status(200).json({
            success: true,
            message: `Rental order status updated to ${status} successfully!`,
            data: result
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Failed to update order status", errorDetails: error.message });
    }
};

export const providerController = {
    addGear,
    updateGear,
    deleteGear,
    //getIncomingOrders,
    updateOrderStatus
};