import  httpStatus  from 'http-status';
import { NextFunction, Request, Response, Router } from "express";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import bcrypt from "bcryptjs";
import { userController } from './user.controller';
import { jwtUtils } from '../../utils/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { Role } from '../../../generated/prisma/enums';
import { catchAsync } from '../../utils/catchAsync';
import { auth } from '../../middlewares/auth';



const router = Router();

router.post("/register", userController.registerUser );



router.get("/me", 
    
auth(Role.ADMIN, Role.CUSTOMER, Role.PROVIDER),
    
    userController.getMyProfile);


export const userRoutes = router;