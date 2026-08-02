import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectDB from "./config/db";
import router from "./routes/transactionRoute";
import authRoute from "./routes/userRoute.js"

configDotenv();
connectDB();

const port = process.env.PORT || 5067;
const app = express()


app.use(cors({
  origin: 'http://localhost:5173',  
  credentials: true,                
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())
app.use("/api/transactions", router)
app.use("/api/auth", authRoute)


app.listen(port, () => {
  console.log(`Server started successfully at port: ${port}`)
})