import { Request, Response } from 'express';
import { adminService } from './admin.service';

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await adminService.getAllUsers();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message,
    });
  }
};

const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const result = await adminService.updateUserStatus(id as string, isActive);
    res.status(200).json({
      success: true,
      message: `User status updated to ${isActive ? 'active' : 'suspended'}!`,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to update user status',
      error: error.message,
    });
  }
};

const getAllGear = async (req: Request, res: Response) => {
  try {
    const result = await adminService.getAllGear();
    res.status(200).json({
      success: true,
      message: 'All gear listings fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch gear listings',
      error: error.message,
    });
  }
};

const getAllRentals = async (req: Request, res: Response) => {
  try {
    const result = await adminService.getAllRentals();
    res.status(200).json({
      success: true,
      message: 'All rental orders fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch rental orders',
      error: error.message,
    });
  }
};

export const adminController = {
  getAllUsers,
  updateUserStatus,
  getAllGear,
  getAllRentals,
};