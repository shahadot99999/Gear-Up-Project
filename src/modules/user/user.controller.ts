import  httpStatus  from 'http-status';
import { NextFunction, Request, Response, Router } from "express";
import { userService } from './user.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import jwt from "jsonwebtoken";
import config from '../../config';
import { jwtUtils } from '../../utils/jwt';




// const registerUser = async(req:Request, res: Response)=>{

//    try {

//       const payload = req.body;
    
//     //const {email,password, name, role }=req.body;

//     const user = await userService.registerUserIntoDB(payload);



 

//     res.status(httpStatus.CREATED).json({
//         success: true,
//         statusCode: httpStatus.CREATED,
//         message: "User registered successfully",
//         data:{
//             user
//         }
//     });
    
//    } catch (error) {
//             console.log(error);
//             res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//              success: false,
//             statusCode: httpStatus.INTERNAL_SERVER_ERROR,
//             message: "Failed to register user",
//             error: (error as Error).message
//    })
// } 
// }

const registerUser = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const user = await userService.registerUserIntoDB(payload);

    // res.status(httpStatus.CREATED).json({
    //     success: true,
    //     statusCode: httpStatus.CREATED,
    //     message: "User registered successfully",
    //     data: {
    //         user
    //     }
    // });

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: { user }
    })
})

const getMyProfile = catchAsync( async (req: Request, res: Response, next: NextFunction) => {

    //const {accessToken} = req.cookies;
    //const cookies = req.cookies;
    //console.log(accessToken);

   // const verifiedToken = jwt.verify(accessToken, config.jwt_access_secret);
    

    
   // console.log(req.user, "user request");

    // const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret)


      const profile = await userService.getMyProfileFromDB(req.user?.id as string);

   // console.log(verifiedToken);
    //res.send("Get my profile")

    // if(typeof verifiedToken === "string"){
    //     throw new Error(verifiedToken);
    // }

    // const profile = await userService.getMyProfileFromDB(verifiedToken.id );

    // Cast it directly to 'any' to bypass strict checks
     // const profile = await userService.getMyProfileFromDB((verifiedToken as any).data?.id);
   


    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User profile fetched successfully",
        data: { profile }
    })
})

export const userController = {
    registerUser,
    getMyProfile
}