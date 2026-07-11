import { Response } from 'express';

export const sendResponse = <T>(
  res: Response,
  status: number,
  data: T,
  message?: string
) => {
  res.status(status).json({
    success: true,
    message,
    data,
  });
};