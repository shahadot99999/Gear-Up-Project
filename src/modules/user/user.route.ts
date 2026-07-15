import  httpStatus  from 'http-status';
import { NextFunction, Request, Response, Router } from "express";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import bcrypt from "bcryptjs";
import { userController } from './user.controller';
import { jwtUtils } from '../../utils/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { Role } from '../../../generated/prisma/enums';



const router = Router();

declare global {
    namespace Express{
        interface Request {
            user?: {
                email: string;
                name: string;
                id: string;
                role: Role;
            }
        }
    }
}


router.post("/register", userController.registerUser );
router.get("/me", (req: Request, res: Response, next: NextFunction)=>{

    console.log(req.cookies);

     const {accessToken} = req.cookies;
        //const cookies = req.cookies;
        console.log(accessToken);
    
       // const verifiedToken = jwt.verify(accessToken, config.jwt_access_secret);
        
    
        
        //console.log(req.user, "user request");
    
         const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret)
    
    
          //const profile = await userService.getMyProfileFromDB(req.user?.id as string);

          

          
    
        console.log(verifiedToken);
        //res.send("Get my profile")
    
        if(typeof verifiedToken === "string"){
            throw new Error(verifiedToken);
        }

        //const { email, name, id, role } = verifiedToken;
        const { email, name, id, role } = (verifiedToken as any).data || {};

        const requiredRoles = [Role.ADMIN, Role.CUSTOMER, Role.PROVIDER];

        if(!requiredRoles.includes(role)){
      return res.status(403).json({
             success: false,
             statusCode: httpStatus.FORBIDDEN,
             message: "Forbidden. You don't have permission to access this resource."
         })
     }

        req.user = {
      email,
         name,
         id,
         role
     };

    next();
   
},


    
    userController.getMyProfile);


export const userRoutes = router;