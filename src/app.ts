import cookieParser from "cookie-parser";
import express, { Application, NextFunction, Request, Response } from "express";

import cors from "cors";


//import { config } from "dotenv";

const app : Application = express();






// app.use(express.json());
// app.use(express.urlencoded({extended : true}));
// app.use(cookieParser());


app.get("/", (req:Request, res: Response)=>{
   
    res.send("Hello World");
})

//app.post()



export default app; 