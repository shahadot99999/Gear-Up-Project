import cookieParser from "cookie-parser";
import express, { Application, NextFunction, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import config from "./config";


//import { config } from "dotenv";

const app : Application = express();

app.use(cors({
    origin: config.app_url,
    credentials: true,
}))




app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());


app.get("/", (req:Request, res: Response)=>{
   
    res.send("Hello World");
})

//app.post()



export default app; 