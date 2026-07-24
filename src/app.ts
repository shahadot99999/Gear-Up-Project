import cookieParser from "cookie-parser";
import express, { Application, NextFunction, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import config from "./config";
import { prisma } from "./lib/prisma";
import  httpStatus  from "http-status";


import bcrypt from "bcryptjs";
import { userRoutes } from "./modules/user/user.route";
import { authRoutes } from "./modules/auth/auth.route";
import { gearRoutes } from './modules/gear/gear.route';
import { providerRoutes } from "./modules/provider/provider.route";
import { rentalRoutes } from "./modules/rental/rental.route";
import { paymentRoutes } from './modules/payment/payment.route';



//import { config } from "dotenv";

const app : Application = express();

app.use(cors({
    origin: config.app_url,
    credentials: true,
}))


//app.use("/api/subscription/webhook", express.raw({ type: 'application/json' }))
//app.use("/api/payments/confirm", express.raw({ type: 'application/json' }));

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());


app.get("/", async(req:Request, res: Response)=>{
   //const user= await prisma.user.findMany()
   //console.log(user);
    res.send("Hello World");
})

//app.post()

// ... middlewares ...

//app.use('/api/auth', authRoutes);  // <-- mount routes

// app.post("/api/users/register", async(req:Request, res: Response)=>{

//     // const payload = req.body;
//     // console.log(payload);

//     const {email,password, name, role }=req.body;

//     const isUserExist = await prisma.user.findUnique({
//         where:{email}
//     })

//     if(isUserExist){
//     throw new Error("User with this email already exists");
//   }

//   const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

//   const createdUser = await prisma.user.create({
//     data: {
//         name,
//         email,
//         password: hashedPassword,
//         role
       

//     }
// });


//   const user = await prisma.user.findUnique({
//     where:{
//         id: createdUser.id,
//         email : createdUser.email || email
//     },
//     omit: {
//     password: true
//     },
    
// })



//     res.status(httpStatus.CREATED).json({
//         success: true,
//         statusCode: httpStatus.CREATED,
//         message: "User registered successfully",
//         data:{
//             user
//         }
//     });
// })

//app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/auth", userRoutes);

app.use("/api/gear", gearRoutes);

app.use("/api/provider", providerRoutes);

app.use("/api/rentals", rentalRoutes);

app.use("/api/payments", paymentRoutes);



export default app; 