import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectDB from "./config/db";
import router from "./routes/transactionRoute";
configDotenv();
connectDB();

const port = process.env.PORT || 5067;
const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/transactions" ,  router)



app.listen(port, () => {
    console.log(`Server started successfullt at port: ${port}`)
})

