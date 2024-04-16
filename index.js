import express from "express";
import dotenv from "dotenv";
import { Router } from "./src/routes/index.js";

//initiating server
const app=express();

//middlewares
app.use(express.json());

//env configuration
dotenv.config();

//initiating port
const PORT=process.env.PORT||9000;

//routes
app.use("/",Router);

//listening to the server
app.listen(PORT,()=>console.log("Server started in Port : "+PORT));