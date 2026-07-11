import { Request, Response } from 'express';
import { register, login } from './auth.service';

import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';

export const registerUser = catchAsync(async (req: Request, res: Response) => {
  const user = await register(req.body);
  sendResponse(res, 201, user, 'User registered successfully');
});

export const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { user, token } = await login(req.body);
  sendResponse(res, 200, { user, token }, 'Login successful');
});